-- Revocando privilegios del rol 'public'
REVOKE CREATE ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON DATABASE communitydb FROM PUBLIC;

-- Crear schema
CREATE SCHEMA IF NOT EXISTS sch_comm;

-- Rol solo lectura


DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles  -- SELECT list can be empty for this
      WHERE  rolname = 'readonly') THEN

        CREATE ROLE readonly;
        GRANT CONNECT ON DATABASE communitydb TO readonly;
        GRANT USAGE ON SCHEMA sch_comm TO readonly;
        GRANT SELECT ON ALL TABLES IN SCHEMA sch_comm TO readonly;
        ALTER DEFAULT PRIVILEGES IN SCHEMA sch_comm GRANT SELECT ON TABLES TO readonly;

   END IF;

    IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles  -- SELECT list can be empty for this
      WHERE  rolname = 'readwrite') THEN

        CREATE ROLE readwrite;
        GRANT CONNECT ON DATABASE communitydb TO readwrite;
        GRANT USAGE, CREATE ON SCHEMA sch_comm TO readwrite;
        GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA sch_comm TO readwrite;
        ALTER DEFAULT PRIVILEGES IN SCHEMA sch_comm GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO readwrite;
        GRANT USAGE ON ALL SEQUENCES IN SCHEMA sch_comm TO readwrite;
        ALTER DEFAULT PRIVILEGES IN SCHEMA sch_comm GRANT USAGE ON SEQUENCES TO readwrite;

    
    END IF;
    IF NOT EXISTS (SELECT * FROM pg_user WHERE pg_user.usename = 'netw_squad') THEN
        CREATE USER netw_squad WITH PASSWORD 'localPasword_123';
        GRANT readwrite TO netw_squad;
    END IF;
    

END;
$do$;



