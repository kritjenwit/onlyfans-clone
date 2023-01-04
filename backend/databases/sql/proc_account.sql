CREATE OR REPLACE PROCEDURE public.proc_account(IN p_input json, INOUT dno integer, INOUT proc_message character varying, INOUT datajson character varying)
 LANGUAGE plpgsql
AS $procedure$
	declare
		-- Init
		v_data VARCHAR; 
		v_data2 VARCHAR :='1'; 
		v_rowCount integer := 0;
		v_now timestamp with time zone := now();
		v_acc_id bigint := 0;
		v_rand_idx bigint := 0;
		v_idx_platform bigint := 0;
	
		-- exception
		text_var1 VARCHAR;
		text_var2 VARCHAR;
		text_var3 VARCHAR;
	
		-- From JSON Input
		p_process_type integer;
		p_app_id integer;
		p_email varchar;
		p_password varchar;
		p_id_wc varchar;
		p_type varchar;
		p_platform varchar;
		p_idx integer;
		p_nickname varchar;
		p_img_url varchar;
		p_ip_address varchar;
		p_country_code varchar;
		p_country_name varchar;
		p_new_idx integer;
		
	begin
		/* ===========================
		 * Process List
		 *	1. Create Account OR Login
		 * 
		 */
		<<app>>
		begin
			p_process_type := p_input->>'process_type';
			p_app_id := p_input->>'app_id';
			p_email := p_input->>'email';
			p_password := p_input->>'password';
			p_id_wc := p_input->>'id_wc';
			p_idx := p_input->>'idx';
			p_nickname := p_input->>'nickname';
			p_img_url := p_input->>'img_url';
			p_ip_address := p_input->>'ip_address';
			p_country_code := p_input->>'country_code';
			p_country_name := p_input->>'country_name';
			p_type := p_input->>'type';
			p_platform := p_input->>'platform';
		
			/* ################################
			 * # @dev: Process Type 1 =Login
			 * # 
			 * ################################
			 */
			if p_process_type = 1 then
				begin
					if (select count(id) from apps a where a.id = p_app_id) = 0 then
						select '201', 'App ID not found', '[]'
						into dno, proc_message, datajson;
						exit app;
					end if;
				end;
				begin
					if p_email = '' or regexp_like(p_email, '@') = false or length(p_email) < 8 then
						select '401', 'Invalid Email', '[]'
						into dno, proc_message, datajson;
						exit app;
					end if;
				end;
				begin
					if p_password = '' or length(p_password) < 6 then
						select '402', 'Invalid Password', '[]'
						into dno, proc_message, datajson;
						exit app;
					end if;
				end;
				
				begin
					select  ac.idx
				    from account ac 
				    where ac.app_id = p_app_id
				    and ac.email = p_email
				    and ac.password = md5(p_password)
				    and ac."type" = p_type
					into p_idx;
				   
				   	if p_idx is null then
				   		select '501', 'Email or password is incorrect', '[]'
						into dno, proc_message, datajson;
						exit app;
				   	end if;
				   
				  
					insert into game_login_log 
					(
					    "ip_address", "platform", 
					    "code", "country", 
						"idx"
					) 
					values 
					(
					    p_ip_address,'Web', 
					    p_country_code, p_country_name,
					   	p_idx
					);
				end;
			
				begin
					select '1101', 'success', row_to_json(t)
					from (
						select a.idx, a.email,
						up.nickname, up.img_url, uw.point, up.subscription_price
						from account a
						left join user_profile up on a.idx = up.idx
						left join user_wallet uw on a.idx = uw.idx
						where a.idx = p_idx
					) as t
					into dno, proc_message, datajson;
				end;
			/* ################################
			 * # @dev: Process Type 2 = Register
			 * # 
			 * ################################
			 */
			elseif p_process_type = 2 then
				begin 
					if p_email = '' or regexp_like(p_email, '@') = false or length(p_email) < 8 then
						select '401', 'Invalid Email', '[]'
						into dno, proc_message, datajson;
						exit app;
					end if;
				end;
			
				begin
					if p_password = '' or length(p_password) < 6 then
						select '401', 'Invalid Password', '[]'
						into dno, proc_message, datajson;
						exit app;
					end if;
				end;
			
				
				begin
					if exists(select 1 from account a where a.email = p_email and app_id = p_app_id and "type" = p_type limit 1) then
						select '502', 'Email is exist', '[]'
						into dno, proc_message, datajson;
						exit app;
					end if;
				end;
				
				
				begin
					/* ################################
					 * # @dev: Get IDX from idx_list
					 * # 
					 * ################################
					 */
					select idx
					from idx_list il 
					limit 1
					into p_idx;
			
					p_new_idx = p_idx + floor(random() * 5 + 1)::int;
				
					update idx_list set idx = p_new_idx;
				
				
					insert into account (
						"created_at", "app_id", "email", "password",
						"type", "platform", "isban", "lastlogin", "idx", "regip"
					) values (
						now(), p_app_id, p_email, md5(p_password),
						p_type, p_platform, false, now(), p_idx, p_ip_address
					)
					returning id 
			        into v_acc_id;
			       
			       	/* ################################
					 * # @description: Once when user create a new account, user must has there own profile
					 * # 				and that profile come from Login API of any application.
					 * # @dev: To Create Profile
					 * # 
					 * ################################
					 */
		            insert into user_profile 
		            (
		                "idx", "nickname", 
		                "img_url","visible",
						"created_at", "updated_at"
		            ) 
		            values 
		            (
		                p_idx, '-', 
		                'https://www.w3schools.com/w3images/avatar2.png', true,
						now(), now()
		            );
		           
		           	/* ################################
					 * # @description: Once when user create a new account, user must has there own wallet
					 * # @dev: To Create wallet for idx
					 * # 
					 * ################################
					 */
		           	insert into user_wallet 
		           	(
		           		"idx", "point",
						"created_at", "updated_at"
		           	) 
		           	values 
		           	(
		           		p_idx, 0,
						now(), now()
		           	);
				end;
			
				begin
					select '1101', 'success', row_to_json(t)
					from (
						select a.idx, a.email,
						up.nickname, up.img_url, uw.point, up.subscription_price
						from account a
						left join user_profile up on a.idx = up.idx
						left join user_wallet uw on a.idx = uw.idx
						where a.idx = p_idx
					) as t
					into dno, proc_message, datajson;
				end;
		
			/* ################################
			 * # @dev: Process Type 3 = Login Google
			 * # 
			 * ################################
			 */
			elseif p_process_type = 3 then
				begin
					if (select count(id) from apps a where a.id = p_app_id) = 0 then
						select '201', 'App ID not found', '[]'
						into dno, proc_message, datajson;
						exit app;
					end if;
				end;
				begin
					if p_email = '' or regexp_like(p_email, '@') = false or length(p_email) < 8 then
						select '401', 'Invalid Email', '[]'
						into dno, proc_message, datajson;
						exit app;
					end if;
				end;
			
				begin
					select  ac.idx
				    from account ac 
				    where ac.app_id = p_app_id
				    and ac.email = p_email
				    and ac."type" = p_type
					into p_idx;
				
					if p_idx is  null then
						begin
							/* ################################
							* # @dev: Get IDX from idx_list
							* # 
							* ################################
							*/
							select idx
							from idx_list il 
							limit 1
							into p_idx;
					
							p_new_idx = p_idx + floor(random() * 5 + 1)::int;
						
							update idx_list set idx = p_new_idx;
						
						
							insert into account (
								"created_at", "app_id", "email", "password",
								"type", "platform", "isban", "lastlogin", "idx", "regip"
							) values (
								now(), p_app_id, p_email, md5(p_password),
								p_type, p_platform, false, now(), p_idx, p_ip_address
							)
							returning id 
							into v_acc_id;
						
							/* ################################
							* # @description: Once when user create a new account, user must has there own profile
							* # 				and that profile come from Login API of any application.
							* # @dev: To Create Profile
							* # 
							* ################################
							*/
							insert into user_profile 
							(
								"idx", "nickname", 
								"img_url","visible",
								"created_at", "updated_at"
							) 
							values 
							(
								p_idx, '-', 
								'https://www.w3schools.com/w3images/avatar2.png', true,
								now(), now()
							);
						
							/* ################################
							* # @description: Once when user create a new account, user must has there own wallet
							* # @dev: To Create wallet for idx
							* # 
							* ################################
							*/
							insert into user_wallet 
							(
								"idx", "point",
								"created_at", "updated_at"
							) 
							values 
							(
								p_idx, 0,
								now(), now()
							);
						end;
					end if;
				
					select '1101', 'success', row_to_json(t)
					from (
						select a.idx, a.email,
						up.nickname, up.img_url, uw.point, up.subscription_price
						from account a
						left join user_profile up on a.idx = up.idx
						left join user_wallet uw on a.idx = uw.idx
						where a.idx = p_idx
					) as t
					into dno, proc_message, datajson;
				
				end;
				
			end if;
		
		end;
		
		-- Exception handling
			EXCEPTION WHEN OTHERS then
			GET STACKED DIAGNOSTICS 
				text_var1 = MESSAGE_TEXT,
				text_var2 = PG_EXCEPTION_DETAIL,
				text_var3 = PG_EXCEPTION_HINT;
	
			select '500', 'SQL Server Error', row_to_json(t) 
			from (
				select 
					text_var1 as error_message,
					text_var2 as error_detail
				
			) as t
			into dno, proc_message, datajson;

			rollback;
	
	END;
$procedure$
;
