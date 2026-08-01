--
-- PostgreSQL database dump
--

\restrict QueKk5ni9iD37FfB0QsRJqKisDxE5tg99u1sQRcVvGW0yRorjxvh7gUhEZAiWHd

-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.4 (Debian 18.4-1+b1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO supabase_admin;

--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA extensions;


ALTER SCHEMA extensions OWNER TO postgres;

--
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql;


ALTER SCHEMA graphql OWNER TO supabase_admin;

--
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql_public;


ALTER SCHEMA graphql_public OWNER TO supabase_admin;

--
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: pgbouncer
--

CREATE SCHEMA pgbouncer;


ALTER SCHEMA pgbouncer OWNER TO pgbouncer;

--
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA realtime;


ALTER SCHEMA realtime OWNER TO supabase_admin;

--
-- Name: storage; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA storage;


ALTER SCHEMA storage OWNER TO supabase_admin;

--
-- Name: supabase_migrations; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA supabase_migrations;


ALTER SCHEMA supabase_migrations OWNER TO postgres;

--
-- Name: vault; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA vault;


ALTER SCHEMA vault OWNER TO supabase_admin;

--
-- Name: pg_graphql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_graphql WITH SCHEMA graphql;


--
-- Name: EXTENSION pg_graphql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_graphql IS 'pg_graphql: GraphQL support';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;


--
-- Name: EXTENSION supabase_vault; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION supabase_vault IS 'Supabase Vault Extension';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: aal_level; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.aal_level AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);


ALTER TYPE auth.aal_level OWNER TO supabase_auth_admin;

--
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.code_challenge_method AS ENUM (
    's256',
    'plain'
);


ALTER TYPE auth.code_challenge_method OWNER TO supabase_auth_admin;

--
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_status AS ENUM (
    'unverified',
    'verified'
);


ALTER TYPE auth.factor_status OWNER TO supabase_auth_admin;

--
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_type AS ENUM (
    'totp',
    'webauthn',
    'phone'
);


ALTER TYPE auth.factor_type OWNER TO supabase_auth_admin;

--
-- Name: oauth_authorization_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_authorization_status AS ENUM (
    'pending',
    'approved',
    'denied',
    'expired'
);


ALTER TYPE auth.oauth_authorization_status OWNER TO supabase_auth_admin;

--
-- Name: oauth_client_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_client_type AS ENUM (
    'public',
    'confidential'
);


ALTER TYPE auth.oauth_client_type OWNER TO supabase_auth_admin;

--
-- Name: oauth_registration_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_registration_type AS ENUM (
    'dynamic',
    'manual'
);


ALTER TYPE auth.oauth_registration_type OWNER TO supabase_auth_admin;

--
-- Name: oauth_response_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_response_type AS ENUM (
    'code'
);


ALTER TYPE auth.oauth_response_type OWNER TO supabase_auth_admin;

--
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.one_time_token_type AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);


ALTER TYPE auth.one_time_token_type OWNER TO supabase_auth_admin;

--
-- Name: action; Type: TYPE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TYPE realtime.action AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);


ALTER TYPE realtime.action OWNER TO supabase_realtime_admin;

--
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TYPE realtime.equality_op AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in',
    'like',
    'ilike',
    'is',
    'match',
    'imatch',
    'isdistinct'
);


ALTER TYPE realtime.equality_op OWNER TO supabase_realtime_admin;

--
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TYPE realtime.user_defined_filter AS (
	column_name text,
	op realtime.equality_op,
	value text,
	negate boolean
);


ALTER TYPE realtime.user_defined_filter OWNER TO supabase_realtime_admin;

--
-- Name: wal_column; Type: TYPE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TYPE realtime.wal_column AS (
	name text,
	type_name text,
	type_oid oid,
	value jsonb,
	is_pkey boolean,
	is_selectable boolean
);


ALTER TYPE realtime.wal_column OWNER TO supabase_realtime_admin;

--
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TYPE realtime.wal_rls AS (
	wal jsonb,
	is_rls_enabled boolean,
	subscription_ids uuid[],
	errors text[]
);


ALTER TYPE realtime.wal_rls OWNER TO supabase_realtime_admin;

--
-- Name: buckettype; Type: TYPE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TYPE storage.buckettype AS ENUM (
    'STANDARD',
    'ANALYTICS',
    'VECTOR'
);


ALTER TYPE storage.buckettype OWNER TO supabase_storage_admin;

--
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  )::text
$$;


ALTER FUNCTION auth.email() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION email(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.email() IS 'Deprecated. Use auth.jwt() -> ''email'' instead.';


--
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select 
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;


ALTER FUNCTION auth.jwt() OWNER TO supabase_auth_admin;

--
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
  )::text
$$;


ALTER FUNCTION auth.role() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION role(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.role() IS 'Deprecated. Use auth.jwt() -> ''role'' instead.';


--
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;


ALTER FUNCTION auth.uid() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION uid(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.uid() IS 'Deprecated. Use auth.jwt() -> ''sub'' instead.';


--
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_cron_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_cron_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_cron_access() IS 'Grants access to pg_cron';


--
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_graphql_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
    func_is_graphql_resolve bool;
BEGIN
    func_is_graphql_resolve = (
        SELECT n.proname = 'resolve'
        FROM pg_event_trigger_ddl_commands() AS ev
        LEFT JOIN pg_catalog.pg_proc AS n
        ON ev.objid = n.oid
    );

    IF func_is_graphql_resolve
    THEN
        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func
        DROP FUNCTION IF EXISTS graphql_public.graphql;
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language sql
        as $$
            select graphql.resolve(
                query := query,
                variables := coalesce(variables, '{}'),
                "operationName" := "operationName",
                extensions := extensions
            );
        $$;

        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last
        -- function in the extension so we need to grant permissions on existing entities AND
        -- update default permissions to any others that are created after `graphql.resolve`
        grant usage on schema graphql to postgres, anon, authenticated, service_role;
        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;
        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;
        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;

        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles
        grant usage on schema graphql_public to postgres with grant option;
        grant usage on schema graphql to postgres with grant option;
    END IF;

END;
$_$;


ALTER FUNCTION extensions.grant_pg_graphql_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_graphql_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_graphql_access() IS 'Grants access to pg_graphql';


--
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_net_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_net'
  )
  THEN
    IF NOT EXISTS (
      SELECT 1
      FROM pg_roles
      WHERE rolname = 'supabase_functions_admin'
    )
    THEN
      CREATE USER supabase_functions_admin NOINHERIT CREATEROLE LOGIN NOREPLICATION;
    END IF;

    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

    IF EXISTS (
      SELECT FROM pg_extension
      WHERE extname = 'pg_net'
      -- all versions in use on existing projects as of 2025-02-20
      -- version 0.12.0 onwards don't need these applied
      AND extversion IN ('0.2', '0.6', '0.7', '0.7.1', '0.8', '0.10.0', '0.11.0')
    ) THEN
      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

      REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
      REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

      GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
      GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    END IF;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_net_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_net_access() IS 'Grants access to pg_net';


--
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_ddl_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_ddl_watch() OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_drop_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_drop_watch() OWNER TO supabase_admin;

--
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.set_graphql_placeholder() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;


ALTER FUNCTION extensions.set_graphql_placeholder() OWNER TO supabase_admin;

--
-- Name: FUNCTION set_graphql_placeholder(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.set_graphql_placeholder() IS 'Reintroduces placeholder function for graphql_public.graphql';


--
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: supabase_admin
--

CREATE FUNCTION pgbouncer.get_auth(p_usename text) RETURNS TABLE(username text, password text)
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO ''
    AS $_$
  BEGIN
      RAISE DEBUG 'PgBouncer auth request: %', p_usename;

      RETURN QUERY
      SELECT
          rolname::text,
          CASE WHEN rolvaliduntil < now()
              THEN null
              ELSE rolpassword::text
          END
      FROM pg_authid
      WHERE rolname=$1 and rolcanlogin;
  END;
  $_$;


ALTER FUNCTION pgbouncer.get_auth(p_usename text) OWNER TO supabase_admin;

--
-- Name: calculate_monthly_revenue_v2(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.calculate_monthly_revenue_v2() RETURNS TABLE(month text, year integer, total_revenue bigint, order_count bigint)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT 
        EXTRACT(MONTH FROM created_at) as month,
        EXTRACT(YEAR FROM created_at) as year,
        COALESCE(SUM(total_amount), 0) as total_revenue,
        COUNT(*) as order_count
    FROM orders 
    WHERE status = 'completed' OR status = 'completed_verification'
    GROUP BY EXTRACT(MONTH FROM created_at), EXTRACT(YEAR FROM created_at)
    ORDER BY year DESC, month DESC;
END;
$$;


ALTER FUNCTION public.calculate_monthly_revenue_v2() OWNER TO postgres;

--
-- Name: calculate_real_monthly_revenue(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.calculate_real_monthly_revenue() RETURNS TABLE(month text, year integer, total_revenue bigint, order_count integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT 
        EXTRACT(MONTH FROM created_at) as month,
        EXTRACT(YEAR FROM created_at) as year,
        COALESCE(SUM(total_amount), 0) as total_revenue,
        COUNT(*) as order_count
    FROM orders 
    WHERE status = 'completed' OR status = 'completed_verification'
    GROUP BY EXTRACT(MONTH FROM created_at), EXTRACT(YEAR FROM created_at)
    ORDER BY year DESC, month DESC;
END;
$$;


ALTER FUNCTION public.calculate_real_monthly_revenue() OWNER TO postgres;

--
-- Name: calculate_real_monthly_revenue_v2(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.calculate_real_monthly_revenue_v2() RETURNS TABLE(month text, year integer, total_revenue bigint, order_count bigint)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT 
        EXTRACT(MONTH FROM created_at)::TEXT as month,
        EXTRACT(YEAR FROM created_at)::INTEGER as year,
        COALESCE(SUM(total_amount), 0)::BIGINT as total_revenue,
        COUNT(*)::BIGINT as order_count
    FROM orders 
    WHERE status = 'completed' OR status = 'completed_verification'
    GROUP BY EXTRACT(MONTH FROM created_at), EXTRACT(YEAR FROM created_at)
    ORDER BY year DESC, month DESC;
END;
$$;


ALTER FUNCTION public.calculate_real_monthly_revenue_v2() OWNER TO postgres;

--
-- Name: increment_program_donation(uuid, bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.increment_program_donation(target_program_id uuid, donation_amount bigint) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
    UPDATE public.programs
    SET terkumpul = terkumpul + donation_amount
    WHERE id = target_program_id;
END;
$$;


ALTER FUNCTION public.increment_program_donation(target_program_id uuid, donation_amount bigint) OWNER TO postgres;

--
-- Name: rls_auto_enable(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.rls_auto_enable() RETURNS event_trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'pg_catalog'
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN
    SELECT *
    FROM pg_event_trigger_ddl_commands()
    WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      AND object_type IN ('table','partitioned table')
  LOOP
     IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
      BEGIN
        EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
        RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
      EXCEPTION
        WHEN OTHERS THEN
          RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
      END;
     ELSE
        RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
     END IF;
  END LOOP;
END;
$$;


ALTER FUNCTION public.rls_auto_enable() OWNER TO postgres;

--
-- Name: update_monthly_revenue_trigger(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_monthly_revenue_trigger() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    order_month TEXT;
    order_year INTEGER;
    revenue_diff NUMERIC := 0;
    count_diff INTEGER := 0;
BEGIN
    IF TG_OP = 'INSERT' THEN
        IF NEW.status = 'completed' THEN
            revenue_diff := NEW.total_amount;
            count_diff := 1;
        END IF;
    ELSIF TG_OP = 'UPDATE' THEN
        IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
            revenue_diff := NEW.total_amount;
            count_diff := 1;
        ELSIF OLD.status = 'completed' AND NEW.status != 'completed' THEN
            revenue_diff := -OLD.total_amount;
            count_diff := -1;
        END IF;
    END IF;

    order_month := trim(to_char(NEW.created_at, 'Month'));
    order_year := extract(year from NEW.created_at);

    IF count_diff != 0 OR revenue_diff != 0 THEN
        INSERT INTO monthly_revenue (month, year, total_revenue, order_count)
        VALUES (order_month, order_year, revenue_diff, count_diff)
        ON CONFLICT (month, year) DO UPDATE 
        SET 
            total_revenue = monthly_revenue.total_revenue + EXCLUDED.total_revenue,
            order_count = monthly_revenue.order_count + EXCLUDED.order_count;
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_monthly_revenue_trigger() OWNER TO postgres;

--
-- Name: update_monthly_revenue_trigger_v2(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_monthly_revenue_trigger_v2() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    DELETE FROM monthly_revenue;
    INSERT INTO monthly_revenue (month, year, total_revenue, order_count)
    SELECT * FROM calculate_monthly_revenue_v2();
    RETURN NULL;
END;
$$;


ALTER FUNCTION public.update_monthly_revenue_trigger_v2() OWNER TO postgres;

--
-- Name: apply_rls(jsonb, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer DEFAULT (1024 * 1024)) RETURNS SETOF realtime.wal_rls
    LANGUAGE plpgsql
    AS $$
declare
    -- Regclass of the table e.g. public.notes
    entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;

    -- I, U, D, T: insert, update ...
    action realtime.action = (
        case wal ->> 'action'
            when 'I' then 'INSERT'
            when 'U' then 'UPDATE'
            when 'D' then 'DELETE'
            else 'ERROR'
        end
    );

    -- Is row level security enabled for the table
    is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

    subscriptions realtime.subscription[] = array_agg(subs)
        from
            realtime.subscription subs
        where
            subs.entity = entity_
            -- Filter by action early - only get subscriptions interested in this action
            -- action_filter column can be: '*' (all), 'INSERT', 'UPDATE', or 'DELETE'
            and (subs.action_filter = '*' or subs.action_filter = action::text);

    -- Subscription vars
    working_role regrole;
    working_selected_columns text[];
    claimed_role regrole;
    claims jsonb;

    subscription_id uuid;
    subscription_has_access bool;
    visible_to_subscription_ids uuid[] = '{}';

    -- structured info for wal's columns
    columns realtime.wal_column[];
    -- previous identity values for update/delete
    old_columns realtime.wal_column[];

    error_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;

    -- Primary jsonb output for record
    output jsonb;

    -- Loop record for iterating unique roles (outer loop)
    role_record record;
    -- Loop record for iterating unique selected_columns within a role (inner loop)
    cols_record record;
    -- Subscription ids visible at the role level (before fanning out by selected_columns)
    visible_role_sub_ids uuid[] = '{}';

begin
    perform set_config('role', null, true);

    columns =
        array_agg(
            (
                x->>'name',
                x->>'type',
                x->>'typeoid',
                realtime.cast(
                    (x->'value') #>> '{}',
                    coalesce(
                        (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                        (x->>'type')::regtype
                    )
                ),
                (pks ->> 'name') is not null,
                true
            )::realtime.wal_column
        )
        from
            jsonb_array_elements(wal -> 'columns') x
            left join jsonb_array_elements(wal -> 'pk') pks
                on (x ->> 'name') = (pks ->> 'name');

    old_columns =
        array_agg(
            (
                x->>'name',
                x->>'type',
                x->>'typeoid',
                realtime.cast(
                    (x->'value') #>> '{}',
                    coalesce(
                        (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                        (x->>'type')::regtype
                    )
                ),
                (pks ->> 'name') is not null,
                true
            )::realtime.wal_column
        )
        from
            jsonb_array_elements(wal -> 'identity') x
            left join jsonb_array_elements(wal -> 'pk') pks
                on (x ->> 'name') = (pks ->> 'name');

    for role_record in
        select claims_role
        from (select distinct claims_role from unnest(subscriptions)) t
        order by claims_role::text
    loop
        working_role := role_record.claims_role;

        -- Update `is_selectable` for columns and old_columns (once per role)
        columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                )::realtime.wal_column
            )
            from
                unnest(columns) c;

        old_columns =
                array_agg(
                    (
                        c.name,
                        c.type_name,
                        c.type_oid,
                        c.value,
                        c.is_pkey,
                        pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                    )::realtime.wal_column
                )
                from
                    unnest(old_columns) c;

        if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
            -- Fan out 400 error per distinct selected_columns for this role
            for cols_record in
                select selected_columns
                from (select distinct selected_columns from unnest(subscriptions) s where s.claims_role = working_role) t
                order by coalesce(array_to_string(selected_columns, ','), '')
            loop
                working_selected_columns := cols_record.selected_columns;
                return next (
                    jsonb_build_object(
                        'schema', wal ->> 'schema',
                        'table', wal ->> 'table',
                        'type', action
                    ),
                    is_rls_enabled,
                    (select array_agg(s.subscription_id) from unnest(subscriptions) as s where s.claims_role = working_role and (s.selected_columns is not distinct from working_selected_columns)),
                    array['Error 400: Bad Request, no primary key']
                )::realtime.wal_rls;
            end loop;

        -- The claims role does not have SELECT permission to the primary key of entity
        elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then
            -- Fan out 401 error per distinct selected_columns for this role
            for cols_record in
                select selected_columns
                from (select distinct selected_columns from unnest(subscriptions) s where s.claims_role = working_role) t
                order by coalesce(array_to_string(selected_columns, ','), '')
            loop
                working_selected_columns := cols_record.selected_columns;
                return next (
                    jsonb_build_object(
                        'schema', wal ->> 'schema',
                        'table', wal ->> 'table',
                        'type', action
                    ),
                    is_rls_enabled,
                    (select array_agg(s.subscription_id) from unnest(subscriptions) as s where s.claims_role = working_role and (s.selected_columns is not distinct from working_selected_columns)),
                    array['Error 401: Unauthorized']
                )::realtime.wal_rls;
            end loop;

        else
            -- Create the prepared statement (once per role)
            if is_rls_enabled and action <> 'DELETE' then
                if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                    deallocate walrus_rls_stmt;
                end if;
                execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
            end if;

            -- Collect all visible subscription IDs for this role (filter check + RLS check)
            visible_role_sub_ids = '{}';

            for subscription_id, claims in (
                    select
                        subs.subscription_id,
                        subs.claims
                    from
                        unnest(subscriptions) subs
                    where
                        subs.entity = entity_
                        and subs.claims_role = working_role
                        and (
                            realtime.is_visible_through_filters(columns, subs.filters)
                            or (
                              action = 'DELETE'
                              and realtime.is_visible_through_filters(old_columns, subs.filters)
                            )
                        )
            ) loop

                if not is_rls_enabled or action = 'DELETE' then
                    visible_role_sub_ids = visible_role_sub_ids || subscription_id;
                else
                    -- Check if RLS allows the role to see the record
                    perform
                        -- Trim leading and trailing quotes from working_role because set_config
                        -- doesn't recognize the role as valid if they are included
                        set_config('role', trim(both '"' from working_role::text), true),
                        set_config('request.jwt.claims', claims::text, true);

                    execute 'execute walrus_rls_stmt' into subscription_has_access;

                    -- Reset the role on every FOR..LOOP batch execution.
                    -- The first batch of 10 rows is pre-fetched using the current connection role (PG internal behaviour)
                    -- then we have to reset it again otherwise it would use the role defined in the `set_config` above
                    -- to fetch the remaining rows when rows>10, which could be a user-defined role that lacks execution grants.
                    -- The flow is:
                    --   1. run batch with conn role
                    --   2. set_config working_role
                    --   3. execute walrus
                    --   4. reset role (revert)
                    --   5. repeat
                    perform set_config('role', null, true);

                    if subscription_has_access then
                        visible_role_sub_ids = visible_role_sub_ids || subscription_id;
                    end if;
                end if;
            end loop;

            perform set_config('role', null, true);

            -- Inner loop: per distinct selected_columns for this role
            for cols_record in
                select selected_columns
                from (select distinct selected_columns from unnest(subscriptions) s where s.claims_role = working_role) t
                order by coalesce(array_to_string(selected_columns, ','), '')
            loop
                working_selected_columns := cols_record.selected_columns;

                output = jsonb_build_object(
                    'schema', wal ->> 'schema',
                    'table', wal ->> 'table',
                    'type', action,
                    'commit_timestamp', to_char(
                        ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),
                        'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
                    ),
                    'columns', (
                        select
                            jsonb_agg(
                                jsonb_build_object(
                                    'name', pa.attname,
                                    'type', pt.typname
                                )
                                order by pa.attnum asc
                            )
                        from
                            pg_attribute pa
                            join pg_type pt
                                on pa.atttypid = pt.oid
                            left join (
                                select unnest(conkey) as pkey_attnum
                                from pg_constraint
                                where conrelid = entity_ and contype = 'p'
                            ) pk on pk.pkey_attnum = pa.attnum
                        where
                            attrelid = entity_
                            and attnum > 0
                            and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
                            and (working_selected_columns is null or pa.attname = any(working_selected_columns) or pk.pkey_attnum is not null)
                    )
                )
                -- Add "record" key for insert and update
                || case
                    when action in ('INSERT', 'UPDATE') then
                        jsonb_build_object(
                            'record',
                            (
                                select
                                    jsonb_object_agg(
                                        -- if unchanged toast, get column name and value from old record
                                        coalesce((c).name, (oc).name),
                                        case
                                            when (c).name is null then (oc).value
                                            else (c).value
                                        end
                                    )
                                from
                                    unnest(columns) c
                                    full outer join unnest(old_columns) oc
                                        on (c).name = (oc).name
                                where
                                    coalesce((c).is_selectable, (oc).is_selectable)
                                    and (working_selected_columns is null or coalesce((c).name, (oc).name) = any(working_selected_columns) or coalesce((c).is_pkey, (oc).is_pkey))
                                    and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                            )
                        )
                    else '{}'::jsonb
                end
                -- Add "old_record" key for update and delete
                || case
                    when action = 'UPDATE' then
                        jsonb_build_object(
                                'old_record',
                                (
                                    select jsonb_object_agg((c).name, (c).value)
                                    from unnest(old_columns) c
                                    where
                                        (c).is_selectable
                                        and (working_selected_columns is null or (c).name = any(working_selected_columns) or (c).is_pkey)
                                        and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                                )
                            )
                    when action = 'DELETE' then
                        jsonb_build_object(
                            'old_record',
                            (
                                select jsonb_object_agg((c).name, (c).value)
                                from unnest(old_columns) c
                                where
                                    (c).is_selectable
                                    and (working_selected_columns is null or (c).name = any(working_selected_columns) or (c).is_pkey)
                                    and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                                    and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                            )
                        )
                    else '{}'::jsonb
                end;

                -- Filter visible_role_sub_ids to those matching the current selected_columns group
                visible_to_subscription_ids = coalesce(
                    (
                        select array_agg(s.subscription_id)
                        from unnest(subscriptions) s
                        where s.claims_role = working_role
                          and (s.selected_columns is not distinct from working_selected_columns)
                          and s.subscription_id = any(visible_role_sub_ids)
                    ),
                    '{}'::uuid[]
                );

                return next (
                    output,
                    is_rls_enabled,
                    visible_to_subscription_ids,
                    case
                        when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                        else '{}'
                    end
                )::realtime.wal_rls;
            end loop;

        end if;
    end loop;

    perform set_config('role', null, true);
end;
$$;


ALTER FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) OWNER TO supabase_realtime_admin;

--
-- Name: broadcast_changes(text, text, text, text, text, record, record, text); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text DEFAULT 'ROW'::text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    -- Declare a variable to hold the JSONB representation of the row
    row_data jsonb := '{}'::jsonb;
BEGIN
    IF level = 'STATEMENT' THEN
        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';
    END IF;
    -- Check the operation type and handle accordingly
    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN
        row_data := jsonb_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);
        PERFORM realtime.send (row_data, event_name, topic_name);
    ELSE
        RAISE EXCEPTION 'Unexpected operation type: %', operation;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;
END;

$$;


ALTER FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) OWNER TO supabase_realtime_admin;

--
-- Name: build_prepared_statement_sql(text, regclass, realtime.wal_column[]); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) RETURNS text
    LANGUAGE sql
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('public.notes', '{"id"}'::text[], '{"bigint"}'::text[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;


ALTER FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) OWNER TO supabase_realtime_admin;

--
-- Name: cast(text, regtype); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime."cast"(val text, type_ regtype) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
declare
  res jsonb;
begin
  if type_::text = 'bytea' then
    return to_jsonb(val);
  end if;
  execute format('select to_jsonb(%L::'|| type_::text || ')', val) into res;
  return res;
end
$$;


ALTER FUNCTION realtime."cast"(val text, type_ regtype) OWNER TO supabase_realtime_admin;

--
-- Name: check_equality_op(realtime.equality_op, regtype, text, text); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $$
/*
Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
*/
declare
    op_symbol text = (
        case
            when op = 'eq' then '='
            when op = 'neq' then '!='
            when op = 'lt' then '<'
            when op = 'lte' then '<='
            when op = 'gt' then '>'
            when op = 'gte' then '>='
            when op = 'in' then '= any'
            else 'UNKNOWN OP'
        end
    );
    res boolean;
begin
    execute format(
        'select %L::'|| type_::text || ' ' || op_symbol
        || ' ( %L::'
        || (
            case
                when op = 'in' then type_::text || '[]'
                else type_::text end
        )
        || ')', val_1, val_2) into res;
    return res;
end;
$$;


ALTER FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) OWNER TO supabase_realtime_admin;

--
-- Name: check_equality_op(realtime.equality_op, regtype, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text, negate boolean) RETURNS boolean
    LANGUAGE plpgsql STABLE
    AS $$
declare
    op_symbol text;
    res boolean;
begin
    -- IS DISTINCT FROM / IS NOT DISTINCT FROM: infix, both sides typed literals
    if op = 'isdistinct' then
        execute format(
            'select %L::%s %s %L::%s',
            val_1,
            type_::text,
            case when negate then 'IS NOT DISTINCT FROM' else 'IS DISTINCT FROM' end,
            val_2,
            type_::text
        ) into res;
        return res;
    end if;

    -- IS requires a keyword RHS (NULL, TRUE, FALSE, UNKNOWN), not a typed literal
    if op = 'is' then
        if val_2 not in ('null', 'true', 'false', 'unknown') then
            raise exception 'invalid value for is filter: must be null, true, false, or unknown';
        end if;
        execute format(
            'select %L::%s %s %s',
            val_1,
            type_::text,
            case when negate then 'IS NOT' else 'IS' end,
            upper(val_2)
        ) into res;
        return res;
    end if;

    op_symbol = case
        when op = 'eq'    then '='
        when op = 'neq'   then '!='
        when op = 'lt'    then '<'
        when op = 'lte'   then '<='
        when op = 'gt'    then '>'
        when op = 'gte'   then '>='
        when op = 'in'    then '= any'
        when op = 'like'   then 'LIKE'
        when op = 'ilike'  then 'ILIKE'
        when op = 'match'  then '~'
        when op = 'imatch' then '~*'
        else null
    end;

    if op_symbol is null then
        raise exception 'unsupported equality operator: %', op::text;
    end if;

    execute format(
        'select %L::%s %s (%L::%s)',
        val_1,
        type_::text,
        op_symbol,
        val_2,
        case when op = 'in' then type_::text || '[]' else type_::text end
    ) into res;

    return case when negate then not res else res end;
end;
$$;


ALTER FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text, negate boolean) OWNER TO supabase_realtime_admin;

--
-- Name: is_visible_through_filters(realtime.wal_column[], realtime.user_defined_filter[]); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) RETURNS boolean
    LANGUAGE sql STABLE
    AS $$
    select
        filters is null
        or array_length(filters, 1) is null
        or coalesce(
            count(col.name) = count(1)
            and sum(
                realtime.check_equality_op(
                    op:=f.op,
                    type_:=coalesce(col.type_oid::regtype, col.type_name::regtype),
                    val_1:=col.value #>> '{}',
                    val_2:=f.value,
                    negate:=coalesce(f.negate, false)
                )::int
            ) filter (where col.name is not null) = count(col.name),
            false
        )
    from
        unnest(filters) f
        left join unnest(columns) col
            on f.column_name = col.name;
$$;


ALTER FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) OWNER TO supabase_realtime_admin;

--
-- Name: list_changes(name, name, integer, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) RETURNS TABLE(wal jsonb, is_rls_enabled boolean, subscription_ids uuid[], errors text[], slot_changes_count bigint)
    LANGUAGE sql
    SET log_min_messages TO 'fatal'
    AS $$
  WITH pub AS (
    SELECT
      concat_ws(
        ',',
        CASE WHEN bool_or(pubinsert) THEN 'insert' ELSE NULL END,
        CASE WHEN bool_or(pubupdate) THEN 'update' ELSE NULL END,
        CASE WHEN bool_or(pubdelete) THEN 'delete' ELSE NULL END
      ) AS w2j_actions,
      coalesce(
        string_agg(
          realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),
          ','
        ) filter (WHERE ppt.tablename IS NOT NULL),
        ''
      ) AS w2j_add_tables
    FROM pg_publication pp
    LEFT JOIN pg_publication_tables ppt ON pp.pubname = ppt.pubname
    WHERE pp.pubname = publication
    GROUP BY pp.pubname
    LIMIT 1
  ),
  -- MATERIALIZED ensures pg_logical_slot_get_changes is called exactly once
  w2j AS MATERIALIZED (
    SELECT x.*, pub.w2j_add_tables
    FROM pub,
         pg_logical_slot_get_changes(
           slot_name, null, max_changes,
           'include-pk', 'true',
           'include-transaction', 'false',
           'include-timestamp', 'true',
           'include-type-oids', 'true',
           'format-version', '2',
           'actions', pub.w2j_actions,
           'add-tables', pub.w2j_add_tables
         ) x
  ),
  slot_count AS (
    SELECT count(*)::bigint AS cnt
    FROM w2j
    WHERE w2j.w2j_add_tables <> ''
  ),
  rls_filtered AS (
    SELECT xyz.wal, xyz.is_rls_enabled, xyz.subscription_ids, xyz.errors
    FROM w2j,
         realtime.apply_rls(
           wal := w2j.data::jsonb,
           max_record_bytes := max_record_bytes
         ) xyz(wal, is_rls_enabled, subscription_ids, errors)
    WHERE w2j.w2j_add_tables <> ''
      AND xyz.subscription_ids[1] IS NOT NULL
  )
  SELECT rf.wal, rf.is_rls_enabled, rf.subscription_ids, rf.errors, sc.cnt
  FROM rls_filtered rf, slot_count sc

  UNION ALL

  SELECT null, null, null, null, sc.cnt
  FROM slot_count sc
  WHERE NOT EXISTS (SELECT 1 FROM rls_filtered)
$$;


ALTER FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) OWNER TO supabase_realtime_admin;

--
-- Name: quote_wal2json(regclass); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.quote_wal2json(entity regclass) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
  SELECT
    realtime.wal2json_escape_identifier(nsp.nspname::text)
    || '.'
    || realtime.wal2json_escape_identifier(pc.relname::text)
  FROM pg_class pc
  JOIN pg_namespace nsp ON pc.relnamespace = nsp.oid
  WHERE pc.oid = entity
$$;


ALTER FUNCTION realtime.quote_wal2json(entity regclass) OWNER TO supabase_realtime_admin;

--
-- Name: send(jsonb, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
  generated_id uuid;
  final_payload jsonb;
BEGIN
  BEGIN
    generated_id := gen_random_uuid();

    -- Check if payload has an 'id' key, if not, add the generated UUID
    IF payload ? 'id' THEN
      final_payload := payload;
    ELSE
      final_payload := jsonb_set(payload, '{id}', to_jsonb(generated_id));
    END IF;

    -- Set the topic configuration
    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    INSERT INTO realtime.messages (id, payload, event, topic, private, extension)
    VALUES (generated_id, final_payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      RAISE WARNING 'WarnSendingBroadcastMessage: %', SQLERRM;
  END;
END;
$$;


ALTER FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) OWNER TO supabase_realtime_admin;

--
-- Name: send_binary(bytea, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.send_binary(payload bytea, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
  generated_id uuid;
BEGIN
  BEGIN
    generated_id := gen_random_uuid();

    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    INSERT INTO realtime.messages (id, binary_payload, event, topic, private, extension)
    VALUES (generated_id, payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      RAISE WARNING 'WarnSendingBroadcastMessage: %', SQLERRM;
  END;
END;
$$;


ALTER FUNCTION realtime.send_binary(payload bytea, event text, topic text, private boolean) OWNER TO supabase_realtime_admin;

--
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.subscription_check_filters() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
declare
    col_names text[] = coalesce(
            array_agg(a.attname order by a.attnum),
            '{}'::text[]
        )
        from
            pg_catalog.pg_attribute a
        where
            a.attrelid = new.entity
            and a.attnum > 0
            and not a.attisdropped
            and pg_catalog.has_column_privilege(
                (new.claims ->> 'role'),
                a.attrelid,
                a.attnum,
                'SELECT'
            );
    filter realtime.user_defined_filter;
    col_type regtype;
    in_val jsonb;
    selected_col text;
begin
    for filter in select * from unnest(new.filters) loop
        if not filter.column_name = any(col_names) then
            raise exception 'invalid column for filter %', filter.column_name;
        end if;

        col_type = (
            select atttypid::regtype
            from pg_catalog.pg_attribute
            where attrelid = new.entity
                  and attname = filter.column_name
        );
        if col_type is null then
            raise exception 'failed to lookup type for column %', filter.column_name;
        end if;

        if filter.op = 'in'::realtime.equality_op then
            in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);
            if coalesce(jsonb_array_length(in_val), 0) > 100 then
                raise exception 'too many values for `in` filter. Maximum 100';
            end if;
        elsif filter.op = 'is'::realtime.equality_op then
            -- `is` requires a keyword RHS rather than a typed literal
            if filter.value not in ('null', 'true', 'false', 'unknown') then
                raise exception 'invalid value for is filter: must be null, true, false, or unknown';
            end if;
            -- IS NULL works for any type, but IS TRUE/FALSE/UNKNOWN require a boolean
            -- operand. Reject the non-null keywords on non-boolean columns here so they
            -- don't abort apply_rls at WAL time.
            if filter.value <> 'null' and col_type <> 'boolean'::regtype then
                raise exception 'is % filter requires a boolean column, got %', filter.value, col_type::text;
            end if;
        elsif filter.op in ('like'::realtime.equality_op, 'ilike'::realtime.equality_op) then
            -- like/ilike apply the text pattern operator (~~); reject column types that
            -- have no such operator instead of failing at WAL time
            if not exists (
                select 1 from pg_catalog.pg_operator
                where oprname = '~~' and oprleft = col_type
            ) then
                raise exception 'operator % requires a text-compatible column type, got %', filter.op::text, col_type::text;
            end if;
        elsif filter.op in ('match'::realtime.equality_op, 'imatch'::realtime.equality_op) then
            -- match/imatch apply the regex operators ~ / ~*; reject column types that have
            -- no such operator (e.g. integer) instead of failing at WAL time, mirroring the
            -- like/ilike guard above.
            if not exists (
                select 1 from pg_catalog.pg_operator
                where oprname = case when filter.op = 'imatch'::realtime.equality_op then '~*' else '~' end
                  and oprleft = col_type
                  and oprright = col_type
                  and oprresult = 'boolean'::regtype
            ) then
                raise exception 'operator % requires a text-compatible column type, got %', filter.op::text, col_type::text;
            end if;
            -- validate the regex eagerly so a bad pattern is rejected here, not inside
            -- apply_rls where it would abort the WAL stream for the entity
            begin
                perform '' ~ filter.value;
            exception when others then
                raise exception 'invalid regular expression for % filter: %', filter.op::text, sqlerrm;
            end;
        else
            -- eq/neq/lt/lte/gt/gte: value must be coercable to the type
            perform realtime.cast(filter.value, col_type);
        end if;
    end loop;

    if new.selected_columns is not null then
        for selected_col in select * from unnest(new.selected_columns) loop
            if not selected_col = any(col_names) then
                raise exception 'invalid column for select %', selected_col;
            end if;
        end loop;
    end if;

    -- Apply consistent order to filters so the unique constraint can't be tricked by a
    -- different filter order. negate is part of the sort key.
    new.filters = coalesce(
        array_agg(f order by f.column_name, f.op, f.value, f.negate),
        '{}'
    ) from unnest(new.filters) f;

    new.selected_columns = (
        select array_agg(c order by c)
        from unnest(new.selected_columns) c
    );

    return new;
end;
$$;


ALTER FUNCTION realtime.subscription_check_filters() OWNER TO supabase_realtime_admin;

--
-- Name: to_regrole(text); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.to_regrole(role_name text) RETURNS regrole
    LANGUAGE sql IMMUTABLE
    AS $$ select role_name::regrole $$;


ALTER FUNCTION realtime.to_regrole(role_name text) OWNER TO supabase_realtime_admin;

--
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.topic() RETURNS text
    LANGUAGE sql STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '')::text;
$$;


ALTER FUNCTION realtime.topic() OWNER TO supabase_realtime_admin;

--
-- Name: wal2json_escape_identifier(text); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.wal2json_escape_identifier(name text) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
  -- Prefix `\`, `,`, `.`, and any whitespace with `\`
  SELECT regexp_replace(name, '([\\,.[:space:]])', '\\\1', 'g')
$$;


ALTER FUNCTION realtime.wal2json_escape_identifier(name text) OWNER TO supabase_realtime_admin;

--
-- Name: allow_any_operation(text[]); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.allow_any_operation(expected_operations text[]) RETURNS boolean
    LANGUAGE sql STABLE
    AS $$
  WITH current_operation AS (
    SELECT storage.operation() AS raw_operation
  ),
  normalized AS (
    SELECT CASE
      WHEN raw_operation LIKE 'storage.%' THEN substr(raw_operation, 9)
      ELSE raw_operation
    END AS current_operation
    FROM current_operation
  )
  SELECT EXISTS (
    SELECT 1
    FROM normalized n
    CROSS JOIN LATERAL unnest(expected_operations) AS expected_operation
    WHERE expected_operation IS NOT NULL
      AND expected_operation <> ''
      AND n.current_operation = CASE
        WHEN expected_operation LIKE 'storage.%' THEN substr(expected_operation, 9)
        ELSE expected_operation
      END
  );
$$;


ALTER FUNCTION storage.allow_any_operation(expected_operations text[]) OWNER TO supabase_storage_admin;

--
-- Name: allow_only_operation(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.allow_only_operation(expected_operation text) RETURNS boolean
    LANGUAGE sql STABLE
    AS $$
  WITH current_operation AS (
    SELECT storage.operation() AS raw_operation
  ),
  normalized AS (
    SELECT
      CASE
        WHEN raw_operation LIKE 'storage.%' THEN substr(raw_operation, 9)
        ELSE raw_operation
      END AS current_operation,
      CASE
        WHEN expected_operation LIKE 'storage.%' THEN substr(expected_operation, 9)
        ELSE expected_operation
      END AS requested_operation
    FROM current_operation
  )
  SELECT CASE
    WHEN requested_operation IS NULL OR requested_operation = '' THEN FALSE
    ELSE COALESCE(current_operation = requested_operation, FALSE)
  END
  FROM normalized;
$$;


ALTER FUNCTION storage.allow_only_operation(expected_operation text) OWNER TO supabase_storage_admin;

--
-- Name: can_insert_object(text, text, uuid, jsonb); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$$;


ALTER FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) OWNER TO supabase_storage_admin;

--
-- Name: enforce_bucket_name_length(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.enforce_bucket_name_length() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
    if length(new.name) > 100 then
        raise exception 'bucket name "%" is too long (% characters). Max is 100.', new.name, length(new.name);
    end if;
    return new;
end;
$$;


ALTER FUNCTION storage.enforce_bucket_name_length() OWNER TO supabase_storage_admin;

--
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.extension(name text) RETURNS text
    LANGUAGE plpgsql IMMUTABLE
    AS $$
DECLARE
    _parts text[];
    _filename text;
BEGIN
    -- Split on "/" to get path segments
    SELECT string_to_array(name, '/') INTO _parts;
    -- Get the last path segment (the actual filename)
    SELECT _parts[array_length(_parts, 1)] INTO _filename;
    -- Extract extension: reverse, split on '.', then reverse again
    RETURN reverse(split_part(reverse(_filename), '.', 1));
END
$$;


ALTER FUNCTION storage.extension(name text) OWNER TO supabase_storage_admin;

--
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.filename(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;


ALTER FUNCTION storage.filename(name text) OWNER TO supabase_storage_admin;

--
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.foldername(name text) RETURNS text[]
    LANGUAGE plpgsql IMMUTABLE
    AS $$
DECLARE
    _parts text[];
BEGIN
    -- Split on "/" to get path segments
    SELECT string_to_array(name, '/') INTO _parts;
    -- Return everything except the last segment
    RETURN _parts[1 : array_length(_parts,1) - 1];
END
$$;


ALTER FUNCTION storage.foldername(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_common_prefix(text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_common_prefix(p_key text, p_prefix text, p_delimiter text) RETURNS text
    LANGUAGE sql IMMUTABLE
    AS $$
SELECT CASE
    WHEN position(p_delimiter IN substring(p_key FROM length(p_prefix) + 1)) > 0
    THEN left(p_key, length(p_prefix) + position(p_delimiter IN substring(p_key FROM length(p_prefix) + 1)))
    ELSE NULL
END;
$$;


ALTER FUNCTION storage.get_common_prefix(p_key text, p_prefix text, p_delimiter text) OWNER TO supabase_storage_admin;

--
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_size_by_bucket() RETURNS TABLE(size bigint, bucket_id text)
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')::bigint)::bigint as size, obj.bucket_id
        from "storage".objects as obj
        group by obj.bucket_id;
END
$$;


ALTER FUNCTION storage.get_size_by_bucket() OWNER TO supabase_storage_admin;

--
-- Name: list_multipart_uploads_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, next_key_token text DEFAULT ''::text, next_upload_token text DEFAULT ''::text) RETURNS TABLE(key text, id text, created_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(key COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))
                    ELSE
                        key
                END AS key, id, created_at
            FROM
                storage.s3_multipart_uploads
            WHERE
                bucket_id = $5 AND
                key ILIKE $1 || ''%'' AND
                CASE
                    WHEN $4 != '''' AND $6 = '''' THEN
                        CASE
                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                key COLLATE "C" > $4
                            END
                    ELSE
                        true
                END AND
                CASE
                    WHEN $6 != '''' THEN
                        id COLLATE "C" > $6
                    ELSE
                        true
                    END
            ORDER BY
                key COLLATE "C" ASC, created_at ASC) as e order by key COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;
END;
$_$;


ALTER FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text) OWNER TO supabase_storage_admin;

--
-- Name: list_objects_with_delimiter(text, text, text, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_objects_with_delimiter(_bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, start_after text DEFAULT ''::text, next_token text DEFAULT ''::text, sort_order text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, metadata jsonb, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    v_peek_name TEXT;
    v_current RECORD;
    v_common_prefix TEXT;

    -- Configuration
    v_is_asc BOOLEAN;
    v_prefix TEXT;
    v_start TEXT;
    v_upper_bound TEXT;
    v_file_batch_size INT;

    -- Seek state
    v_next_seek TEXT;
    v_count INT := 0;

    -- Dynamic SQL for batch query only
    v_batch_query TEXT;

BEGIN
    -- ========================================================================
    -- INITIALIZATION
    -- ========================================================================
    v_is_asc := lower(coalesce(sort_order, 'asc')) = 'asc';
    v_prefix := coalesce(prefix_param, '');
    v_start := CASE WHEN coalesce(next_token, '') <> '' THEN next_token ELSE coalesce(start_after, '') END;
    v_file_batch_size := LEAST(GREATEST(max_keys * 2, 100), 1000);

    -- Calculate upper bound for prefix filtering (bytewise, using COLLATE "C")
    IF v_prefix = '' THEN
        v_upper_bound := NULL;
    ELSIF right(v_prefix, 1) = delimiter_param THEN
        v_upper_bound := left(v_prefix, -1) || chr(ascii(delimiter_param) + 1);
    ELSE
        v_upper_bound := left(v_prefix, -1) || chr(ascii(right(v_prefix, 1)) + 1);
    END IF;

    -- Build batch query (dynamic SQL - called infrequently, amortized over many rows)
    IF v_is_asc THEN
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" >= $2 ' ||
                'AND o.name COLLATE "C" < $3 ORDER BY o.name COLLATE "C" ASC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" >= $2 ' ||
                'ORDER BY o.name COLLATE "C" ASC LIMIT $4';
        END IF;
    ELSE
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" < $2 ' ||
                'AND o.name COLLATE "C" >= $3 ORDER BY o.name COLLATE "C" DESC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" < $2 ' ||
                'ORDER BY o.name COLLATE "C" DESC LIMIT $4';
        END IF;
    END IF;

    -- ========================================================================
    -- SEEK INITIALIZATION: Determine starting position
    -- ========================================================================
    IF v_start = '' THEN
        IF v_is_asc THEN
            v_next_seek := v_prefix;
        ELSE
            -- DESC without cursor: find the last item in range
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_next_seek FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_prefix AND o.name COLLATE "C" < v_upper_bound
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSIF v_prefix <> '' THEN
                SELECT o.name INTO v_next_seek FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_prefix
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSE
                SELECT o.name INTO v_next_seek FROM storage.objects o
                WHERE o.bucket_id = _bucket_id
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            END IF;

            IF v_next_seek IS NOT NULL THEN
                v_next_seek := v_next_seek || delimiter_param;
            ELSE
                RETURN;
            END IF;
        END IF;
    ELSE
        -- Cursor provided: determine if it refers to a folder or leaf
        IF EXISTS (
            SELECT 1 FROM storage.objects o
            WHERE o.bucket_id = _bucket_id
              AND o.name COLLATE "C" LIKE v_start || delimiter_param || '%'
            LIMIT 1
        ) THEN
            -- Cursor refers to a folder
            IF v_is_asc THEN
                v_next_seek := v_start || chr(ascii(delimiter_param) + 1);
            ELSE
                v_next_seek := v_start || delimiter_param;
            END IF;
        ELSE
            -- Cursor refers to a leaf object
            IF v_is_asc THEN
                v_next_seek := v_start || delimiter_param;
            ELSE
                v_next_seek := v_start;
            END IF;
        END IF;
    END IF;

    -- ========================================================================
    -- MAIN LOOP: Hybrid peek-then-batch algorithm
    -- Uses STATIC SQL for peek (hot path) and DYNAMIC SQL for batch
    -- ========================================================================
    LOOP
        EXIT WHEN v_count >= max_keys;

        -- STEP 1: PEEK using STATIC SQL (plan cached, very fast)
        IF v_is_asc THEN
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_next_seek AND o.name COLLATE "C" < v_upper_bound
                ORDER BY o.name COLLATE "C" ASC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_next_seek
                ORDER BY o.name COLLATE "C" ASC LIMIT 1;
            END IF;
        ELSE
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" < v_next_seek AND o.name COLLATE "C" >= v_prefix
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSIF v_prefix <> '' THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" < v_next_seek AND o.name COLLATE "C" >= v_prefix
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" < v_next_seek
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            END IF;
        END IF;

        EXIT WHEN v_peek_name IS NULL;

        -- STEP 2: Check if this is a FOLDER or FILE
        v_common_prefix := storage.get_common_prefix(v_peek_name, v_prefix, delimiter_param);

        IF v_common_prefix IS NOT NULL THEN
            -- FOLDER: Emit and skip to next folder (no heap access needed)
            name := rtrim(v_common_prefix, delimiter_param);
            id := NULL;
            updated_at := NULL;
            created_at := NULL;
            last_accessed_at := NULL;
            metadata := NULL;
            RETURN NEXT;
            v_count := v_count + 1;

            -- Advance seek past the folder range
            IF v_is_asc THEN
                v_next_seek := left(v_common_prefix, -1) || chr(ascii(delimiter_param) + 1);
            ELSE
                v_next_seek := v_common_prefix;
            END IF;
        ELSE
            -- FILE: Batch fetch using DYNAMIC SQL (overhead amortized over many rows)
            -- For ASC: upper_bound is the exclusive upper limit (< condition)
            -- For DESC: prefix is the inclusive lower limit (>= condition)
            FOR v_current IN EXECUTE v_batch_query USING _bucket_id, v_next_seek,
                CASE WHEN v_is_asc THEN COALESCE(v_upper_bound, v_prefix) ELSE v_prefix END, v_file_batch_size
            LOOP
                v_common_prefix := storage.get_common_prefix(v_current.name, v_prefix, delimiter_param);

                IF v_common_prefix IS NOT NULL THEN
                    -- Hit a folder: exit batch, let peek handle it
                    v_next_seek := v_current.name;
                    EXIT;
                END IF;

                -- Emit file
                name := v_current.name;
                id := v_current.id;
                updated_at := v_current.updated_at;
                created_at := v_current.created_at;
                last_accessed_at := v_current.last_accessed_at;
                metadata := v_current.metadata;
                RETURN NEXT;
                v_count := v_count + 1;

                -- Advance seek past this file
                IF v_is_asc THEN
                    v_next_seek := v_current.name || delimiter_param;
                ELSE
                    v_next_seek := v_current.name;
                END IF;

                EXIT WHEN v_count >= max_keys;
            END LOOP;
        END IF;
    END LOOP;
END;
$_$;


ALTER FUNCTION storage.list_objects_with_delimiter(_bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text, sort_order text) OWNER TO supabase_storage_admin;

--
-- Name: operation(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.operation() RETURNS text
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$$;


ALTER FUNCTION storage.operation() OWNER TO supabase_storage_admin;

--
-- Name: protect_delete(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.protect_delete() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Check if storage.allow_delete_query is set to 'true'
    IF COALESCE(current_setting('storage.allow_delete_query', true), 'false') != 'true' THEN
        RAISE EXCEPTION 'Direct deletion from storage tables is not allowed. Use the Storage API instead.'
            USING HINT = 'This prevents accidental data loss from orphaned objects.',
                  ERRCODE = '42501';
    END IF;
    RETURN NULL;
END;
$$;


ALTER FUNCTION storage.protect_delete() OWNER TO supabase_storage_admin;

--
-- Name: search(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    v_peek_name TEXT;
    v_current RECORD;
    v_common_prefix TEXT;
    v_delimiter CONSTANT TEXT := '/';

    -- Configuration
    v_limit INT;
    v_prefix TEXT;
    v_prefix_lower TEXT;
    v_is_asc BOOLEAN;
    v_order_by TEXT;
    v_sort_order TEXT;
    v_upper_bound TEXT;
    v_file_batch_size INT;

    -- Dynamic SQL for batch query only
    v_batch_query TEXT;

    -- Seek state
    v_next_seek TEXT;
    v_count INT := 0;
    v_skipped INT := 0;
BEGIN
    -- ========================================================================
    -- INITIALIZATION
    -- ========================================================================
    v_limit := LEAST(coalesce(limits, 100), 1500);
    v_prefix := coalesce(prefix, '') || coalesce(search, '');
    v_prefix_lower := lower(v_prefix);
    v_is_asc := lower(coalesce(sortorder, 'asc')) = 'asc';
    v_file_batch_size := LEAST(GREATEST(v_limit * 2, 100), 1000);

    -- Validate sort column
    CASE lower(coalesce(sortcolumn, 'name'))
        WHEN 'name' THEN v_order_by := 'name';
        WHEN 'updated_at' THEN v_order_by := 'updated_at';
        WHEN 'created_at' THEN v_order_by := 'created_at';
        WHEN 'last_accessed_at' THEN v_order_by := 'last_accessed_at';
        ELSE v_order_by := 'name';
    END CASE;

    v_sort_order := CASE WHEN v_is_asc THEN 'asc' ELSE 'desc' END;

    -- ========================================================================
    -- NON-NAME SORTING: Use path_tokens approach (unchanged)
    -- ========================================================================
    IF v_order_by != 'name' THEN
        RETURN QUERY EXECUTE format(
            $sql$
            WITH folders AS (
                SELECT path_tokens[$1] AS folder
                FROM storage.objects
                WHERE objects.name ILIKE $2 || '%%'
                  AND bucket_id = $3
                  AND array_length(objects.path_tokens, 1) <> $1
                GROUP BY folder
                ORDER BY folder %s
            )
            (SELECT folder AS "name",
                   NULL::uuid AS id,
                   NULL::timestamptz AS updated_at,
                   NULL::timestamptz AS created_at,
                   NULL::timestamptz AS last_accessed_at,
                   NULL::jsonb AS metadata FROM folders)
            UNION ALL
            (SELECT path_tokens[$1] AS "name",
                   id, updated_at, created_at, last_accessed_at, metadata
             FROM storage.objects
             WHERE objects.name ILIKE $2 || '%%'
               AND bucket_id = $3
               AND array_length(objects.path_tokens, 1) = $1
             ORDER BY %I %s)
            LIMIT $4 OFFSET $5
            $sql$, v_sort_order, v_order_by, v_sort_order
        ) USING levels, v_prefix, bucketname, v_limit, offsets;
        RETURN;
    END IF;

    -- ========================================================================
    -- NAME SORTING: Hybrid skip-scan with batch optimization
    -- ========================================================================

    -- Calculate upper bound for prefix filtering
    IF v_prefix_lower = '' THEN
        v_upper_bound := NULL;
    ELSIF right(v_prefix_lower, 1) = v_delimiter THEN
        v_upper_bound := left(v_prefix_lower, -1) || chr(ascii(v_delimiter) + 1);
    ELSE
        v_upper_bound := left(v_prefix_lower, -1) || chr(ascii(right(v_prefix_lower, 1)) + 1);
    END IF;

    -- Build batch query (dynamic SQL - called infrequently, amortized over many rows)
    IF v_is_asc THEN
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" >= $2 ' ||
                'AND lower(o.name) COLLATE "C" < $3 ORDER BY lower(o.name) COLLATE "C" ASC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" >= $2 ' ||
                'ORDER BY lower(o.name) COLLATE "C" ASC LIMIT $4';
        END IF;
    ELSE
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" < $2 ' ||
                'AND lower(o.name) COLLATE "C" >= $3 ORDER BY lower(o.name) COLLATE "C" DESC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" < $2 ' ||
                'ORDER BY lower(o.name) COLLATE "C" DESC LIMIT $4';
        END IF;
    END IF;

    -- Initialize seek position
    IF v_is_asc THEN
        v_next_seek := v_prefix_lower;
    ELSE
        -- DESC: find the last item in range first (static SQL)
        IF v_upper_bound IS NOT NULL THEN
            SELECT o.name INTO v_peek_name FROM storage.objects o
            WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_prefix_lower AND lower(o.name) COLLATE "C" < v_upper_bound
            ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
        ELSIF v_prefix_lower <> '' THEN
            SELECT o.name INTO v_peek_name FROM storage.objects o
            WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_prefix_lower
            ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
        ELSE
            SELECT o.name INTO v_peek_name FROM storage.objects o
            WHERE o.bucket_id = bucketname
            ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
        END IF;

        IF v_peek_name IS NOT NULL THEN
            v_next_seek := lower(v_peek_name) || v_delimiter;
        ELSE
            RETURN;
        END IF;
    END IF;

    -- ========================================================================
    -- MAIN LOOP: Hybrid peek-then-batch algorithm
    -- Uses STATIC SQL for peek (hot path) and DYNAMIC SQL for batch
    -- ========================================================================
    LOOP
        EXIT WHEN v_count >= v_limit;

        -- STEP 1: PEEK using STATIC SQL (plan cached, very fast)
        IF v_is_asc THEN
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_next_seek AND lower(o.name) COLLATE "C" < v_upper_bound
                ORDER BY lower(o.name) COLLATE "C" ASC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_next_seek
                ORDER BY lower(o.name) COLLATE "C" ASC LIMIT 1;
            END IF;
        ELSE
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" < v_next_seek AND lower(o.name) COLLATE "C" >= v_prefix_lower
                ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
            ELSIF v_prefix_lower <> '' THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" < v_next_seek AND lower(o.name) COLLATE "C" >= v_prefix_lower
                ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" < v_next_seek
                ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
            END IF;
        END IF;

        EXIT WHEN v_peek_name IS NULL;

        -- STEP 2: Check if this is a FOLDER or FILE
        v_common_prefix := storage.get_common_prefix(lower(v_peek_name), v_prefix_lower, v_delimiter);

        IF v_common_prefix IS NOT NULL THEN
            -- FOLDER: Handle offset, emit if needed, skip to next folder
            IF v_skipped < offsets THEN
                v_skipped := v_skipped + 1;
            ELSE
                name := split_part(rtrim(storage.get_common_prefix(v_peek_name, v_prefix, v_delimiter), v_delimiter), v_delimiter, levels);
                id := NULL;
                updated_at := NULL;
                created_at := NULL;
                last_accessed_at := NULL;
                metadata := NULL;
                RETURN NEXT;
                v_count := v_count + 1;
            END IF;

            -- Advance seek past the folder range
            IF v_is_asc THEN
                v_next_seek := lower(left(v_common_prefix, -1)) || chr(ascii(v_delimiter) + 1);
            ELSE
                v_next_seek := lower(v_common_prefix);
            END IF;
        ELSE
            -- FILE: Batch fetch using DYNAMIC SQL (overhead amortized over many rows)
            -- For ASC: upper_bound is the exclusive upper limit (< condition)
            -- For DESC: prefix_lower is the inclusive lower limit (>= condition)
            FOR v_current IN EXECUTE v_batch_query
                USING bucketname, v_next_seek,
                    CASE WHEN v_is_asc THEN COALESCE(v_upper_bound, v_prefix_lower) ELSE v_prefix_lower END, v_file_batch_size
            LOOP
                v_common_prefix := storage.get_common_prefix(lower(v_current.name), v_prefix_lower, v_delimiter);

                IF v_common_prefix IS NOT NULL THEN
                    -- Hit a folder: exit batch, let peek handle it
                    v_next_seek := lower(v_current.name);
                    EXIT;
                END IF;

                -- Handle offset skipping
                IF v_skipped < offsets THEN
                    v_skipped := v_skipped + 1;
                ELSE
                    -- Emit file
                    name := split_part(v_current.name, v_delimiter, levels);
                    id := v_current.id;
                    updated_at := v_current.updated_at;
                    created_at := v_current.created_at;
                    last_accessed_at := v_current.last_accessed_at;
                    metadata := v_current.metadata;
                    RETURN NEXT;
                    v_count := v_count + 1;
                END IF;

                -- Advance seek past this file
                IF v_is_asc THEN
                    v_next_seek := lower(v_current.name) || v_delimiter;
                ELSE
                    v_next_seek := lower(v_current.name);
                END IF;

                EXIT WHEN v_count >= v_limit;
            END LOOP;
        END IF;
    END LOOP;
END;
$_$;


ALTER FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: search_by_timestamp(text, text, integer, integer, text, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_by_timestamp(p_prefix text, p_bucket_id text, p_limit integer, p_level integer, p_start_after text, p_sort_order text, p_sort_column text, p_sort_column_after text) RETURNS TABLE(key text, name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    v_cursor_op text;
    v_query text;
    v_prefix text;
BEGIN
    v_prefix := coalesce(p_prefix, '');

    IF p_sort_order = 'asc' THEN
        v_cursor_op := '>';
    ELSE
        v_cursor_op := '<';
    END IF;

    v_query := format($sql$
        WITH raw_objects AS (
            SELECT
                o.name AS obj_name,
                o.id AS obj_id,
                o.updated_at AS obj_updated_at,
                o.created_at AS obj_created_at,
                o.last_accessed_at AS obj_last_accessed_at,
                o.metadata AS obj_metadata,
                storage.get_common_prefix(o.name, $1, '/') AS common_prefix
            FROM storage.objects o
            WHERE o.bucket_id = $2
              AND o.name COLLATE "C" LIKE $1 || '%%'
        ),
        -- Aggregate common prefixes (folders)
        -- Both created_at and updated_at use MIN(obj_created_at) to match the old prefixes table behavior
        aggregated_prefixes AS (
            SELECT
                rtrim(common_prefix, '/') AS name,
                NULL::uuid AS id,
                MIN(obj_created_at) AS updated_at,
                MIN(obj_created_at) AS created_at,
                NULL::timestamptz AS last_accessed_at,
                NULL::jsonb AS metadata,
                TRUE AS is_prefix
            FROM raw_objects
            WHERE common_prefix IS NOT NULL
            GROUP BY common_prefix
        ),
        leaf_objects AS (
            SELECT
                obj_name AS name,
                obj_id AS id,
                obj_updated_at AS updated_at,
                obj_created_at AS created_at,
                obj_last_accessed_at AS last_accessed_at,
                obj_metadata AS metadata,
                FALSE AS is_prefix
            FROM raw_objects
            WHERE common_prefix IS NULL
        ),
        combined AS (
            SELECT * FROM aggregated_prefixes
            UNION ALL
            SELECT * FROM leaf_objects
        ),
        filtered AS (
            SELECT *
            FROM combined
            WHERE (
                $5 = ''
                OR ROW(
                    date_trunc('milliseconds', %I),
                    name COLLATE "C"
                ) %s ROW(
                    COALESCE(NULLIF($6, '')::timestamptz, 'epoch'::timestamptz),
                    $5
                )
            )
        )
        SELECT
            split_part(name, '/', $3) AS key,
            name,
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
        FROM filtered
        ORDER BY
            COALESCE(date_trunc('milliseconds', %I), 'epoch'::timestamptz) %s,
            name COLLATE "C" %s
        LIMIT $4
    $sql$,
        p_sort_column,
        v_cursor_op,
        p_sort_column,
        p_sort_order,
        p_sort_order
    );

    RETURN QUERY EXECUTE v_query
    USING v_prefix, p_bucket_id, p_level, p_limit, p_start_after, p_sort_column_after;
END;
$_$;


ALTER FUNCTION storage.search_by_timestamp(p_prefix text, p_bucket_id text, p_limit integer, p_level integer, p_start_after text, p_sort_order text, p_sort_column text, p_sort_column_after text) OWNER TO supabase_storage_admin;

--
-- Name: search_v2(text, text, integer, integer, text, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer DEFAULT 100, levels integer DEFAULT 1, start_after text DEFAULT ''::text, sort_order text DEFAULT 'asc'::text, sort_column text DEFAULT 'name'::text, sort_column_after text DEFAULT ''::text) RETURNS TABLE(key text, name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $$
DECLARE
    v_sort_col text;
    v_sort_ord text;
    v_limit int;
BEGIN
    -- Cap limit to maximum of 1500 records
    v_limit := LEAST(coalesce(limits, 100), 1500);

    -- Validate and normalize sort_order
    v_sort_ord := lower(coalesce(sort_order, 'asc'));
    IF v_sort_ord NOT IN ('asc', 'desc') THEN
        v_sort_ord := 'asc';
    END IF;

    -- Validate and normalize sort_column
    v_sort_col := lower(coalesce(sort_column, 'name'));
    IF v_sort_col NOT IN ('name', 'updated_at', 'created_at') THEN
        v_sort_col := 'name';
    END IF;

    -- Route to appropriate implementation
    IF v_sort_col = 'name' THEN
        -- Use list_objects_with_delimiter for name sorting (most efficient: O(k * log n))
        RETURN QUERY
        SELECT
            split_part(l.name, '/', levels) AS key,
            l.name AS name,
            l.id,
            l.updated_at,
            l.created_at,
            l.last_accessed_at,
            l.metadata
        FROM storage.list_objects_with_delimiter(
            bucket_name,
            coalesce(prefix, ''),
            '/',
            v_limit,
            start_after,
            '',
            v_sort_ord
        ) l;
    ELSE
        -- Use aggregation approach for timestamp sorting
        -- Not efficient for large datasets but supports correct pagination
        RETURN QUERY SELECT * FROM storage.search_by_timestamp(
            prefix, bucket_name, v_limit, levels, start_after,
            v_sort_ord, v_sort_col, sort_column_after
        );
    END IF;
END;
$$;


ALTER FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer, levels integer, start_after text, sort_order text, sort_column text, sort_column_after text) OWNER TO supabase_storage_admin;

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$;


ALTER FUNCTION storage.update_updated_at_column() OWNER TO supabase_storage_admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.audit_log_entries (
    instance_id uuid,
    id uuid NOT NULL,
    payload json,
    created_at timestamp with time zone,
    ip_address character varying(64) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE auth.audit_log_entries OWNER TO supabase_auth_admin;

--
-- Name: TABLE audit_log_entries; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.audit_log_entries IS 'Auth: Audit trail for user actions.';


--
-- Name: custom_oauth_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.custom_oauth_providers (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    provider_type text NOT NULL,
    identifier text NOT NULL,
    name text NOT NULL,
    client_id text NOT NULL,
    client_secret text NOT NULL,
    acceptable_client_ids text[] DEFAULT '{}'::text[] NOT NULL,
    scopes text[] DEFAULT '{}'::text[] NOT NULL,
    pkce_enabled boolean DEFAULT true NOT NULL,
    attribute_mapping jsonb DEFAULT '{}'::jsonb NOT NULL,
    authorization_params jsonb DEFAULT '{}'::jsonb NOT NULL,
    enabled boolean DEFAULT true NOT NULL,
    email_optional boolean DEFAULT false NOT NULL,
    issuer text,
    discovery_url text,
    skip_nonce_check boolean DEFAULT false NOT NULL,
    cached_discovery jsonb,
    discovery_cached_at timestamp with time zone,
    authorization_url text,
    token_url text,
    userinfo_url text,
    jwks_uri text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    custom_claims_allowlist text[] DEFAULT '{}'::text[] NOT NULL,
    CONSTRAINT custom_oauth_providers_authorization_url_https CHECK (((authorization_url IS NULL) OR (authorization_url ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_authorization_url_length CHECK (((authorization_url IS NULL) OR (char_length(authorization_url) <= 2048))),
    CONSTRAINT custom_oauth_providers_client_id_length CHECK (((char_length(client_id) >= 1) AND (char_length(client_id) <= 512))),
    CONSTRAINT custom_oauth_providers_discovery_url_length CHECK (((discovery_url IS NULL) OR (char_length(discovery_url) <= 2048))),
    CONSTRAINT custom_oauth_providers_identifier_format CHECK ((identifier ~ '^[a-z0-9][a-z0-9:-]{0,48}[a-z0-9]$'::text)),
    CONSTRAINT custom_oauth_providers_issuer_length CHECK (((issuer IS NULL) OR ((char_length(issuer) >= 1) AND (char_length(issuer) <= 2048)))),
    CONSTRAINT custom_oauth_providers_jwks_uri_https CHECK (((jwks_uri IS NULL) OR (jwks_uri ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_jwks_uri_length CHECK (((jwks_uri IS NULL) OR (char_length(jwks_uri) <= 2048))),
    CONSTRAINT custom_oauth_providers_name_length CHECK (((char_length(name) >= 1) AND (char_length(name) <= 100))),
    CONSTRAINT custom_oauth_providers_oauth2_requires_endpoints CHECK (((provider_type <> 'oauth2'::text) OR ((authorization_url IS NOT NULL) AND (token_url IS NOT NULL) AND (userinfo_url IS NOT NULL)))),
    CONSTRAINT custom_oauth_providers_oidc_discovery_url_https CHECK (((provider_type <> 'oidc'::text) OR (discovery_url IS NULL) OR (discovery_url ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_oidc_issuer_https CHECK (((provider_type <> 'oidc'::text) OR (issuer IS NULL) OR (issuer ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_oidc_requires_issuer CHECK (((provider_type <> 'oidc'::text) OR (issuer IS NOT NULL))),
    CONSTRAINT custom_oauth_providers_provider_type_check CHECK ((provider_type = ANY (ARRAY['oauth2'::text, 'oidc'::text]))),
    CONSTRAINT custom_oauth_providers_token_url_https CHECK (((token_url IS NULL) OR (token_url ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_token_url_length CHECK (((token_url IS NULL) OR (char_length(token_url) <= 2048))),
    CONSTRAINT custom_oauth_providers_userinfo_url_https CHECK (((userinfo_url IS NULL) OR (userinfo_url ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_userinfo_url_length CHECK (((userinfo_url IS NULL) OR (char_length(userinfo_url) <= 2048)))
);


ALTER TABLE auth.custom_oauth_providers OWNER TO supabase_auth_admin;

--
-- Name: flow_state; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.flow_state (
    id uuid NOT NULL,
    user_id uuid,
    auth_code text,
    code_challenge_method auth.code_challenge_method,
    code_challenge text,
    provider_type text NOT NULL,
    provider_access_token text,
    provider_refresh_token text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    authentication_method text NOT NULL,
    auth_code_issued_at timestamp with time zone,
    invite_token text,
    referrer text,
    oauth_client_state_id uuid,
    linking_target_id uuid,
    email_optional boolean DEFAULT false NOT NULL
);


ALTER TABLE auth.flow_state OWNER TO supabase_auth_admin;

--
-- Name: TABLE flow_state; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.flow_state IS 'Stores metadata for all OAuth/SSO login flows';


--
-- Name: identities; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.identities (
    provider_id text NOT NULL,
    user_id uuid NOT NULL,
    identity_data jsonb NOT NULL,
    provider text NOT NULL,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email text GENERATED ALWAYS AS (lower((identity_data ->> 'email'::text))) STORED,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE auth.identities OWNER TO supabase_auth_admin;

--
-- Name: TABLE identities; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.identities IS 'Auth: Stores identities associated to a user.';


--
-- Name: COLUMN identities.email; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.identities.email IS 'Auth: Email is a generated column that references the optional email property in the identity_data';


--
-- Name: instances; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.instances (
    id uuid NOT NULL,
    uuid uuid,
    raw_base_config text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE auth.instances OWNER TO supabase_auth_admin;

--
-- Name: TABLE instances; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.instances IS 'Auth: Manages users across multiple sites.';


--
-- Name: mfa_amr_claims; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_amr_claims (
    session_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    authentication_method text NOT NULL,
    id uuid NOT NULL
);


ALTER TABLE auth.mfa_amr_claims OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_amr_claims; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_amr_claims IS 'auth: stores authenticator method reference claims for multi factor authentication';


--
-- Name: mfa_challenges; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_challenges (
    id uuid NOT NULL,
    factor_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    verified_at timestamp with time zone,
    ip_address inet NOT NULL,
    otp_code text,
    web_authn_session_data jsonb
);


ALTER TABLE auth.mfa_challenges OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_challenges; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_challenges IS 'auth: stores metadata about challenge requests made';


--
-- Name: mfa_factors; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_factors (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    friendly_name text,
    factor_type auth.factor_type NOT NULL,
    status auth.factor_status NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    secret text,
    phone text,
    last_challenged_at timestamp with time zone,
    web_authn_credential jsonb,
    web_authn_aaguid uuid,
    last_webauthn_challenge_data jsonb
);


ALTER TABLE auth.mfa_factors OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_factors; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_factors IS 'auth: stores metadata about factors';


--
-- Name: COLUMN mfa_factors.last_webauthn_challenge_data; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.mfa_factors.last_webauthn_challenge_data IS 'Stores the latest WebAuthn challenge data including attestation/assertion for customer verification';


--
-- Name: oauth_authorizations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_authorizations (
    id uuid NOT NULL,
    authorization_id text NOT NULL,
    client_id uuid NOT NULL,
    user_id uuid,
    redirect_uri text NOT NULL,
    scope text NOT NULL,
    state text,
    resource text,
    code_challenge text,
    code_challenge_method auth.code_challenge_method,
    response_type auth.oauth_response_type DEFAULT 'code'::auth.oauth_response_type NOT NULL,
    status auth.oauth_authorization_status DEFAULT 'pending'::auth.oauth_authorization_status NOT NULL,
    authorization_code text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    expires_at timestamp with time zone DEFAULT (now() + '00:03:00'::interval) NOT NULL,
    approved_at timestamp with time zone,
    nonce text,
    CONSTRAINT oauth_authorizations_authorization_code_length CHECK ((char_length(authorization_code) <= 255)),
    CONSTRAINT oauth_authorizations_code_challenge_length CHECK ((char_length(code_challenge) <= 128)),
    CONSTRAINT oauth_authorizations_expires_at_future CHECK ((expires_at > created_at)),
    CONSTRAINT oauth_authorizations_nonce_length CHECK ((char_length(nonce) <= 255)),
    CONSTRAINT oauth_authorizations_redirect_uri_length CHECK ((char_length(redirect_uri) <= 2048)),
    CONSTRAINT oauth_authorizations_resource_length CHECK ((char_length(resource) <= 2048)),
    CONSTRAINT oauth_authorizations_scope_length CHECK ((char_length(scope) <= 4096)),
    CONSTRAINT oauth_authorizations_state_length CHECK ((char_length(state) <= 4096))
);


ALTER TABLE auth.oauth_authorizations OWNER TO supabase_auth_admin;

--
-- Name: oauth_client_states; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_client_states (
    id uuid NOT NULL,
    provider_type text NOT NULL,
    code_verifier text,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE auth.oauth_client_states OWNER TO supabase_auth_admin;

--
-- Name: TABLE oauth_client_states; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.oauth_client_states IS 'Stores OAuth states for third-party provider authentication flows where Supabase acts as the OAuth client.';


--
-- Name: oauth_clients; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_clients (
    id uuid NOT NULL,
    client_secret_hash text,
    registration_type auth.oauth_registration_type NOT NULL,
    redirect_uris text NOT NULL,
    grant_types text NOT NULL,
    client_name text,
    client_uri text,
    logo_uri text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    client_type auth.oauth_client_type DEFAULT 'confidential'::auth.oauth_client_type NOT NULL,
    token_endpoint_auth_method text NOT NULL,
    CONSTRAINT oauth_clients_client_name_length CHECK ((char_length(client_name) <= 1024)),
    CONSTRAINT oauth_clients_client_uri_length CHECK ((char_length(client_uri) <= 2048)),
    CONSTRAINT oauth_clients_logo_uri_length CHECK ((char_length(logo_uri) <= 2048)),
    CONSTRAINT oauth_clients_token_endpoint_auth_method_check CHECK ((token_endpoint_auth_method = ANY (ARRAY['client_secret_basic'::text, 'client_secret_post'::text, 'none'::text])))
);


ALTER TABLE auth.oauth_clients OWNER TO supabase_auth_admin;

--
-- Name: oauth_consents; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_consents (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    client_id uuid NOT NULL,
    scopes text NOT NULL,
    granted_at timestamp with time zone DEFAULT now() NOT NULL,
    revoked_at timestamp with time zone,
    CONSTRAINT oauth_consents_revoked_after_granted CHECK (((revoked_at IS NULL) OR (revoked_at >= granted_at))),
    CONSTRAINT oauth_consents_scopes_length CHECK ((char_length(scopes) <= 2048)),
    CONSTRAINT oauth_consents_scopes_not_empty CHECK ((char_length(TRIM(BOTH FROM scopes)) > 0))
);


ALTER TABLE auth.oauth_consents OWNER TO supabase_auth_admin;

--
-- Name: one_time_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.one_time_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token_type auth.one_time_token_type NOT NULL,
    token_hash text NOT NULL,
    relates_to text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT one_time_tokens_token_hash_check CHECK ((char_length(token_hash) > 0))
);


ALTER TABLE auth.one_time_tokens OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.refresh_tokens (
    instance_id uuid,
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    parent character varying(255),
    session_id uuid
);


ALTER TABLE auth.refresh_tokens OWNER TO supabase_auth_admin;

--
-- Name: TABLE refresh_tokens; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.refresh_tokens IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: supabase_auth_admin
--

CREATE SEQUENCE auth.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE auth.refresh_tokens_id_seq OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: supabase_auth_admin
--

ALTER SEQUENCE auth.refresh_tokens_id_seq OWNED BY auth.refresh_tokens.id;


--
-- Name: saml_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_providers (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    entity_id text NOT NULL,
    metadata_xml text NOT NULL,
    metadata_url text,
    attribute_mapping jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name_id_format text,
    CONSTRAINT "entity_id not empty" CHECK ((char_length(entity_id) > 0)),
    CONSTRAINT "metadata_url not empty" CHECK (((metadata_url = NULL::text) OR (char_length(metadata_url) > 0))),
    CONSTRAINT "metadata_xml not empty" CHECK ((char_length(metadata_xml) > 0))
);


ALTER TABLE auth.saml_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_providers IS 'Auth: Manages SAML Identity Provider connections.';


--
-- Name: saml_relay_states; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_relay_states (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    request_id text NOT NULL,
    for_email text,
    redirect_to text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    flow_state_id uuid,
    CONSTRAINT "request_id not empty" CHECK ((char_length(request_id) > 0))
);


ALTER TABLE auth.saml_relay_states OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_relay_states; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_relay_states IS 'Auth: Contains SAML Relay State information for each Service Provider initiated login.';


--
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.schema_migrations (
    version character varying(255) NOT NULL
);


ALTER TABLE auth.schema_migrations OWNER TO supabase_auth_admin;

--
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.schema_migrations IS 'Auth: Manages updates to the auth system.';


--
-- Name: sessions; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sessions (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    factor_id uuid,
    aal auth.aal_level,
    not_after timestamp with time zone,
    refreshed_at timestamp without time zone,
    user_agent text,
    ip inet,
    tag text,
    oauth_client_id uuid,
    refresh_token_hmac_key text,
    refresh_token_counter bigint,
    scopes text,
    CONSTRAINT sessions_scopes_length CHECK ((char_length(scopes) <= 4096))
);


ALTER TABLE auth.sessions OWNER TO supabase_auth_admin;

--
-- Name: TABLE sessions; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sessions IS 'Auth: Stores session data associated to a user.';


--
-- Name: COLUMN sessions.not_after; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.not_after IS 'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.';


--
-- Name: COLUMN sessions.refresh_token_hmac_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.refresh_token_hmac_key IS 'Holds a HMAC-SHA256 key used to sign refresh tokens for this session.';


--
-- Name: COLUMN sessions.refresh_token_counter; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.refresh_token_counter IS 'Holds the ID (counter) of the last issued refresh token.';


--
-- Name: sso_domains; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_domains (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    domain text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "domain not empty" CHECK ((char_length(domain) > 0))
);


ALTER TABLE auth.sso_domains OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_domains; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_domains IS 'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.';


--
-- Name: sso_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_providers (
    id uuid NOT NULL,
    resource_id text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    disabled boolean,
    CONSTRAINT "resource_id not empty" CHECK (((resource_id = NULL::text) OR (char_length(resource_id) > 0)))
);


ALTER TABLE auth.sso_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_providers IS 'Auth: Manages SSO identity provider information; see saml_providers for SAML.';


--
-- Name: COLUMN sso_providers.resource_id; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sso_providers.resource_id IS 'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.';


--
-- Name: users; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.users (
    instance_id uuid,
    id uuid NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token_new character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    phone text DEFAULT NULL::character varying,
    phone_confirmed_at timestamp with time zone,
    phone_change text DEFAULT ''::character varying,
    phone_change_token character varying(255) DEFAULT ''::character varying,
    phone_change_sent_at timestamp with time zone,
    confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current character varying(255) DEFAULT ''::character varying,
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamp with time zone,
    reauthentication_token character varying(255) DEFAULT ''::character varying,
    reauthentication_sent_at timestamp with time zone,
    is_sso_user boolean DEFAULT false NOT NULL,
    deleted_at timestamp with time zone,
    is_anonymous boolean DEFAULT false NOT NULL,
    CONSTRAINT users_email_change_confirm_status_check CHECK (((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)))
);


ALTER TABLE auth.users OWNER TO supabase_auth_admin;

--
-- Name: TABLE users; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';


--
-- Name: COLUMN users.is_sso_user; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.users.is_sso_user IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';


--
-- Name: webauthn_challenges; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.webauthn_challenges (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    challenge_type text NOT NULL,
    session_data jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    CONSTRAINT webauthn_challenges_challenge_type_check CHECK ((challenge_type = ANY (ARRAY['signup'::text, 'registration'::text, 'authentication'::text])))
);


ALTER TABLE auth.webauthn_challenges OWNER TO supabase_auth_admin;

--
-- Name: webauthn_credentials; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.webauthn_credentials (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    credential_id bytea NOT NULL,
    public_key bytea NOT NULL,
    attestation_type text DEFAULT ''::text NOT NULL,
    aaguid uuid,
    sign_count bigint DEFAULT 0 NOT NULL,
    transports jsonb DEFAULT '[]'::jsonb NOT NULL,
    backup_eligible boolean DEFAULT false NOT NULL,
    backed_up boolean DEFAULT false NOT NULL,
    friendly_name text DEFAULT ''::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    last_used_at timestamp with time zone
);


ALTER TABLE auth.webauthn_credentials OWNER TO supabase_auth_admin;

--
-- Name: articles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.articles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    category text NOT NULL,
    snippet text NOT NULL,
    image_url text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    video_url text
);


ALTER TABLE public.articles OWNER TO postgres;

--
-- Name: bank_accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bank_accounts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    bank_name text NOT NULL,
    account_number text NOT NULL,
    holder_name text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE public.bank_accounts OWNER TO postgres;

--
-- Name: bimba_articles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bimba_articles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    category text NOT NULL,
    snippet text,
    content text,
    image_url text,
    video_url text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE public.bimba_articles OWNER TO postgres;

--
-- Name: donations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.donations (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text DEFAULT 'Hamba Allah'::text NOT NULL,
    amount bigint NOT NULL,
    program_title text NOT NULL,
    message text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    status text DEFAULT 'PENDING'::text,
    program_id uuid,
    phone text,
    amin_count integer DEFAULT 0,
    order_id text
);


ALTER TABLE public.donations OWNER TO postgres;

--
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    email text,
    phone text NOT NULL,
    subject text NOT NULL,
    message text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- Name: programs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.programs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    category text NOT NULL,
    target bigint DEFAULT 0 NOT NULL,
    terkumpul bigint DEFAULT 0 NOT NULL,
    description text NOT NULL,
    image_url text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    status text DEFAULT 'Aktif'::text
);


ALTER TABLE public.programs OWNER TO postgres;

--
-- Name: qurban_orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.qurban_orders (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    nama_donatur text NOT NULL,
    nomor_wa text NOT NULL,
    tipe_qurban text NOT NULL,
    nama_mudhohi text NOT NULL,
    total_bayar numeric NOT NULL,
    status_pembayaran text DEFAULT 'PENDING'::text NOT NULL
);


ALTER TABLE public.qurban_orders OWNER TO postgres;

--
-- Name: qurban_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.qurban_settings (
    id integer DEFAULT 1 NOT NULL,
    status text DEFAULT 'OFF'::text NOT NULL,
    harga_kambing numeric DEFAULT 2500000 NOT NULL,
    harga_sapi_patungan numeric DEFAULT 3000000 NOT NULL,
    harga_sapi_utuh numeric DEFAULT 21000000 NOT NULL,
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.qurban_settings OWNER TO postgres;

--
-- Name: messages; Type: TABLE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TABLE realtime.messages (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    binary_payload bytea
)
PARTITION BY RANGE (inserted_at);


ALTER TABLE realtime.messages OWNER TO supabase_realtime_admin;

--
-- Name: messages_2026_05_30; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2026_05_30 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    binary_payload bytea
);


ALTER TABLE realtime.messages_2026_05_30 OWNER TO supabase_admin;

--
-- Name: messages_2026_05_31; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2026_05_31 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    binary_payload bytea
);


ALTER TABLE realtime.messages_2026_05_31 OWNER TO supabase_admin;

--
-- Name: messages_2026_06_01; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2026_06_01 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    binary_payload bytea
);


ALTER TABLE realtime.messages_2026_06_01 OWNER TO supabase_admin;

--
-- Name: messages_2026_06_02; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2026_06_02 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    binary_payload bytea
);


ALTER TABLE realtime.messages_2026_06_02 OWNER TO supabase_admin;

--
-- Name: messages_2026_06_03; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2026_06_03 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    binary_payload bytea
);


ALTER TABLE realtime.messages_2026_06_03 OWNER TO supabase_admin;

--
-- Name: messages_2026_06_04; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2026_06_04 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    binary_payload bytea
);


ALTER TABLE realtime.messages_2026_06_04 OWNER TO supabase_admin;

--
-- Name: messages_2026_06_05; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2026_06_05 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    binary_payload bytea
);


ALTER TABLE realtime.messages_2026_06_05 OWNER TO supabase_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE realtime.schema_migrations OWNER TO supabase_admin;

--
-- Name: subscription; Type: TABLE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TABLE realtime.subscription (
    id bigint NOT NULL,
    subscription_id uuid NOT NULL,
    entity regclass NOT NULL,
    filters realtime.user_defined_filter[] DEFAULT '{}'::realtime.user_defined_filter[] NOT NULL,
    claims jsonb NOT NULL,
    claims_role regrole GENERATED ALWAYS AS (realtime.to_regrole((claims ->> 'role'::text))) STORED NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    action_filter text DEFAULT '*'::text,
    selected_columns text[],
    CONSTRAINT subscription_action_filter_check CHECK ((action_filter = ANY (ARRAY['*'::text, 'INSERT'::text, 'UPDATE'::text, 'DELETE'::text])))
);


ALTER TABLE realtime.subscription OWNER TO supabase_realtime_admin;

--
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE realtime.subscription ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME realtime.subscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: buckets; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    public boolean DEFAULT false,
    avif_autodetection boolean DEFAULT false,
    file_size_limit bigint,
    allowed_mime_types text[],
    owner_id text,
    type storage.buckettype DEFAULT 'STANDARD'::storage.buckettype NOT NULL
);


ALTER TABLE storage.buckets OWNER TO supabase_storage_admin;

--
-- Name: COLUMN buckets.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.buckets.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: buckets_analytics; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets_analytics (
    name text NOT NULL,
    type storage.buckettype DEFAULT 'ANALYTICS'::storage.buckettype NOT NULL,
    format text DEFAULT 'ICEBERG'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE storage.buckets_analytics OWNER TO supabase_storage_admin;

--
-- Name: buckets_vectors; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets_vectors (
    id text NOT NULL,
    type storage.buckettype DEFAULT 'VECTOR'::storage.buckettype NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.buckets_vectors OWNER TO supabase_storage_admin;

--
-- Name: migrations; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE storage.migrations OWNER TO supabase_storage_admin;

--
-- Name: objects; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.objects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    bucket_id text,
    name text,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_accessed_at timestamp with time zone DEFAULT now(),
    metadata jsonb,
    path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/'::text)) STORED,
    version text,
    owner_id text,
    user_metadata jsonb
);


ALTER TABLE storage.objects OWNER TO supabase_storage_admin;

--
-- Name: COLUMN objects.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.objects.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: s3_multipart_uploads; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads (
    id text NOT NULL,
    in_progress_size bigint DEFAULT 0 NOT NULL,
    upload_signature text NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    version text NOT NULL,
    owner_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_metadata jsonb,
    metadata jsonb
);


ALTER TABLE storage.s3_multipart_uploads OWNER TO supabase_storage_admin;

--
-- Name: s3_multipart_uploads_parts; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads_parts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    upload_id text NOT NULL,
    size bigint DEFAULT 0 NOT NULL,
    part_number integer NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    etag text NOT NULL,
    owner_id text,
    version text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.s3_multipart_uploads_parts OWNER TO supabase_storage_admin;

--
-- Name: vector_indexes; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.vector_indexes (
    id text DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL COLLATE pg_catalog."C",
    bucket_id text NOT NULL,
    data_type text NOT NULL,
    dimension integer NOT NULL,
    distance_metric text NOT NULL,
    metadata_configuration jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.vector_indexes OWNER TO supabase_storage_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: supabase_migrations; Owner: postgres
--

CREATE TABLE supabase_migrations.schema_migrations (
    version text NOT NULL,
    statements text[],
    name text
);


ALTER TABLE supabase_migrations.schema_migrations OWNER TO postgres;

--
-- Name: messages_2026_05_30; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2026_05_30 FOR VALUES FROM ('2026-05-30 00:00:00') TO ('2026-05-31 00:00:00');


--
-- Name: messages_2026_05_31; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2026_05_31 FOR VALUES FROM ('2026-05-31 00:00:00') TO ('2026-06-01 00:00:00');


--
-- Name: messages_2026_06_01; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2026_06_01 FOR VALUES FROM ('2026-06-01 00:00:00') TO ('2026-06-02 00:00:00');


--
-- Name: messages_2026_06_02; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2026_06_02 FOR VALUES FROM ('2026-06-02 00:00:00') TO ('2026-06-03 00:00:00');


--
-- Name: messages_2026_06_03; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2026_06_03 FOR VALUES FROM ('2026-06-03 00:00:00') TO ('2026-06-04 00:00:00');


--
-- Name: messages_2026_06_04; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2026_06_04 FOR VALUES FROM ('2026-06-04 00:00:00') TO ('2026-06-05 00:00:00');


--
-- Name: messages_2026_06_05; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2026_06_05 FOR VALUES FROM ('2026-06-05 00:00:00') TO ('2026-06-06 00:00:00');


--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass);


--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) FROM stdin;
\.


--
-- Data for Name: custom_oauth_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.custom_oauth_providers (id, provider_type, identifier, name, client_id, client_secret, acceptable_client_ids, scopes, pkce_enabled, attribute_mapping, authorization_params, enabled, email_optional, issuer, discovery_url, skip_nonce_check, cached_discovery, discovery_cached_at, authorization_url, token_url, userinfo_url, jwks_uri, created_at, updated_at, custom_claims_allowlist) FROM stdin;
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at, invite_token, referrer, oauth_client_state_id, linking_target_id, email_optional) FROM stdin;
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) FROM stdin;
ef8d126a-75ab-4041-a99a-b34d1b172590	ef8d126a-75ab-4041-a99a-b34d1b172590	{"sub": "ef8d126a-75ab-4041-a99a-b34d1b172590", "email": "owner@warungakang.com", "email_verified": false, "phone_verified": false}	email	2026-03-11 06:10:56.226095+00	2026-03-11 06:10:56.226165+00	2026-03-11 06:10:56.226165+00	ad872c97-6c38-42f1-a773-64785ded108c
4ae63542-b6ae-4bb3-ae56-15e7aae8a5dc	4ae63542-b6ae-4bb3-ae56-15e7aae8a5dc	{"sub": "4ae63542-b6ae-4bb3-ae56-15e7aae8a5dc", "email": "admin@bimba.yamupeduli.id", "email_verified": false, "phone_verified": false}	email	2026-06-05 09:29:20.734094+00	2026-06-05 09:29:20.734146+00	2026-06-05 09:29:20.734146+00	585e2e9e-bd87-476d-bee3-1d3f41c12056
f550c73c-03cd-47b0-96fb-c31c9638e737	f550c73c-03cd-47b0-96fb-c31c9638e737	{"sub": "f550c73c-03cd-47b0-96fb-c31c9638e737", "email": "root@yamu.id", "email_verified": false, "phone_verified": false}	email	2026-07-31 12:43:25.119431+00	2026-07-31 12:43:25.119487+00	2026-07-31 12:43:25.119487+00	fcdda5ae-c81a-412b-a4dd-3f99fc0b2ee9
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.instances (id, uuid, raw_base_config, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) FROM stdin;
695a5b96-0737-4313-b070-4fe7ecf44c37	2026-05-30 07:33:16.148136+00	2026-05-30 07:33:16.148136+00	password	9589a32d-67aa-456f-b5a0-dda9d1152a1a
429ab435-e69b-42f9-acfd-29d033b164d0	2026-07-31 12:43:42.843331+00	2026-07-31 12:43:42.843331+00	password	365102bf-b39b-4808-be3d-6c1b43bae399
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_challenges (id, factor_id, created_at, verified_at, ip_address, otp_code, web_authn_session_data) FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret, phone, last_challenged_at, web_authn_credential, web_authn_aaguid, last_webauthn_challenge_data) FROM stdin;
\.


--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_authorizations (id, authorization_id, client_id, user_id, redirect_uri, scope, state, resource, code_challenge, code_challenge_method, response_type, status, authorization_code, created_at, expires_at, approved_at, nonce) FROM stdin;
\.


--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_client_states (id, provider_type, code_verifier, created_at) FROM stdin;
\.


--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_clients (id, client_secret_hash, registration_type, redirect_uris, grant_types, client_name, client_uri, logo_uri, created_at, updated_at, deleted_at, client_type, token_endpoint_auth_method) FROM stdin;
\.


--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_consents (id, user_id, client_id, scopes, granted_at, revoked_at) FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) FROM stdin;
00000000-0000-0000-0000-000000000000	49	owq4gpskdugu	ef8d126a-75ab-4041-a99a-b34d1b172590	t	2026-05-30 07:33:16.131176+00	2026-05-30 08:39:00.081156+00	\N	695a5b96-0737-4313-b070-4fe7ecf44c37
00000000-0000-0000-0000-000000000000	52	bi37wyedctu7	ef8d126a-75ab-4041-a99a-b34d1b172590	t	2026-05-30 08:39:00.102029+00	2026-05-30 12:17:21.926785+00	owq4gpskdugu	695a5b96-0737-4313-b070-4fe7ecf44c37
00000000-0000-0000-0000-000000000000	97	tcf2unoistu3	f550c73c-03cd-47b0-96fb-c31c9638e737	f	2026-07-31 12:43:42.786538+00	2026-07-31 12:43:42.786538+00	\N	429ab435-e69b-42f9-acfd-29d033b164d0
00000000-0000-0000-0000-000000000000	57	6umwb5ybzlss	ef8d126a-75ab-4041-a99a-b34d1b172590	t	2026-05-30 12:17:21.9461+00	2026-06-01 09:26:31.138988+00	bi37wyedctu7	695a5b96-0737-4313-b070-4fe7ecf44c37
00000000-0000-0000-0000-000000000000	69	43u2q6ekbyus	ef8d126a-75ab-4041-a99a-b34d1b172590	t	2026-06-01 09:26:31.180083+00	2026-06-01 10:24:33.23697+00	6umwb5ybzlss	695a5b96-0737-4313-b070-4fe7ecf44c37
00000000-0000-0000-0000-000000000000	70	xfvoljo56py2	ef8d126a-75ab-4041-a99a-b34d1b172590	t	2026-06-01 10:24:33.252275+00	2026-06-02 04:49:44.212008+00	43u2q6ekbyus	695a5b96-0737-4313-b070-4fe7ecf44c37
00000000-0000-0000-0000-000000000000	73	olcyo4m5kd2c	ef8d126a-75ab-4041-a99a-b34d1b172590	f	2026-06-02 04:49:44.221807+00	2026-06-02 04:49:44.221807+00	xfvoljo56py2	695a5b96-0737-4313-b070-4fe7ecf44c37
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_providers (id, sso_provider_id, entity_id, metadata_xml, metadata_url, attribute_mapping, created_at, updated_at, name_id_format) FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_relay_states (id, sso_provider_id, request_id, for_email, redirect_to, created_at, updated_at, flow_state_id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.schema_migrations (version) FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
00
20210710035447
20210722035447
20210730183235
20210909172000
20210927181326
20211122151130
20211124214934
20211202183645
20220114185221
20220114185340
20220224000811
20220323170000
20220429102000
20220531120530
20220614074223
20220811173540
20221003041349
20221003041400
20221011041400
20221020193600
20221021073300
20221021082433
20221027105023
20221114143122
20221114143410
20221125140132
20221208132122
20221215195500
20221215195800
20221215195900
20230116124310
20230116124412
20230131181311
20230322519590
20230402418590
20230411005111
20230508135423
20230523124323
20230818113222
20230914180801
20231027141322
20231114161723
20231117164230
20240115144230
20240214120130
20240306115329
20240314092811
20240427152123
20240612123726
20240729123726
20240802193726
20240806073726
20241009103726
20250717082212
20250731150234
20250804100000
20250901200500
20250903112500
20250904133000
20250925093508
20251007112900
20251104100000
20251111201300
20251201000000
20260115000000
20260121000000
20260219120000
20260302000000
20260625000000
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag, oauth_client_id, refresh_token_hmac_key, refresh_token_counter, scopes) FROM stdin;
429ab435-e69b-42f9-acfd-29d033b164d0	f550c73c-03cd-47b0-96fb-c31c9638e737	2026-07-31 12:43:42.716096+00	2026-07-31 12:43:42.716096+00	\N	aal1	\N	\N	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	103.130.18.131	\N	\N	\N	\N	\N
695a5b96-0737-4313-b070-4fe7ecf44c37	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-05-30 07:33:16.087145+00	2026-06-02 04:49:44.234815+00	\N	aal1	\N	2026-06-02 04:49:44.234696	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36	203.83.40.1	\N	\N	\N	\N	\N
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_domains (id, sso_provider_id, domain, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_providers (id, resource_id, created_at, updated_at, disabled) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) FROM stdin;
00000000-0000-0000-0000-000000000000	4ae63542-b6ae-4bb3-ae56-15e7aae8a5dc	authenticated	authenticated	admin@bimba.yamupeduli.id	$2a$10$8U83BWw1z..Q1TVE0XOmceIbajwu14H45UVCwz4jtCf9DVkyWbFpO	2026-06-05 09:29:20.739362+00	\N		\N		\N			\N	\N	{"provider": "email", "providers": ["email"]}	{"email_verified": true}	\N	2026-06-05 09:29:20.725529+00	2026-06-05 09:29:20.746128+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	f550c73c-03cd-47b0-96fb-c31c9638e737	authenticated	authenticated	root@yamu.id	$2a$10$gRNRUkhhFhAhq3a0fu6oRuyA5RGOgNhShf9LIta9urIhPrgArmWEC	2026-07-31 12:43:25.13047+00	\N		\N		\N			\N	2026-07-31 12:43:42.714687+00	{"provider": "email", "providers": ["email"]}	{"email_verified": true}	\N	2026-07-31 12:43:25.100817+00	2026-07-31 12:43:42.841884+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	ef8d126a-75ab-4041-a99a-b34d1b172590	authenticated	authenticated	owner@warungakang.com	$2a$10$cEvTxstf8ReBoQOydmHp5ufmjznOLSCLyiHV5VSzUgbzCvkSV5N2m	2026-03-11 06:10:56.243182+00	\N		\N		\N			\N	2026-05-30 07:33:16.087047+00	{"provider": "email", "providers": ["email"]}	{"email_verified": true}	\N	2026-03-11 06:10:56.201708+00	2026-06-02 04:49:44.230039+00	\N	\N			\N		0	\N		\N	f	\N	f
\.


--
-- Data for Name: webauthn_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.webauthn_challenges (id, user_id, challenge_type, session_data, created_at, expires_at) FROM stdin;
\.


--
-- Data for Name: webauthn_credentials; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.webauthn_credentials (id, user_id, credential_id, public_key, attestation_type, aaguid, sign_count, transports, backup_eligible, backed_up, friendly_name, created_at, updated_at, last_used_at) FROM stdin;
\.


--
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.articles (id, title, category, snippet, image_url, created_at, video_url) FROM stdin;
70096743-9743-4131-923b-797e221229d8	xssssss	ssssssss	dcddd	https://qhqtewsbfqvxuxwtdiqb.supabase.co/storage/v1/object/public/yamu-assets/articles/1780214413726-Screenshot_2026-05-30_10_03_01.png	2026-05-31 08:00:14.509214+00	\N
8bb45750-d7f5-4489-b690-a2ebd5084bcb	sssss	ssssssssssss	sssssssssssssssssssssssssssssssssss	\N	2026-06-16 03:24:46.287064+00	https://youtu.be/FUFUdtocbdo?si=o6o4m2dXs7TPmGoC
\.


--
-- Data for Name: bank_accounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bank_accounts (id, bank_name, account_number, holder_name, created_at) FROM stdin;
\.


--
-- Data for Name: bimba_articles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bimba_articles (id, title, category, snippet, content, image_url, video_url, created_at) FROM stdin;
15ab5d50-d080-4588-8b15-1f2652edee9b	Kerjaan Anak Bimba	KEGIATAN	HALLO INI DARI BIMBAHALLO INI DARI BIMBAHALLO INI DARI BIMBAHALLO INI DARI BIMBAHALLO INI DARI BIMBAHALLO INI DARI BIMBAHALLO INI DARI BIMBAHALLO INI DARI BIMBAHALLO INI DARI BIMBAHALLO INI DARI BIMBAHALLO INI DARI BIMBAHALLO INI DARI BIMBAHALLO INI DARI BIMBAHALLO INI DARI BIMBAHALLO INI DARI BIMBAHALLO INI DARI BIMBAHALLO INI DARI BIMBAHALLO INI DARI BIMBAHALLO INI DARI BIMBAHALLO INI DARI BIMBAHALLO INI DARI BIMBAv	\N	\N	https://youtu.be/MfpDaklkOng?si=Ce9Ffak-gONvaphx	2026-06-16 02:21:55.127326+00
e38f21f0-5d25-4c16-9a58-f84869021f29	HALLO INI DARI BIMBA	HALLO INI DARI BIMBA	HALLO INI DARI BIMBAHALLO INI DARI BIMBA	\N	https://qhqtewsbfqvxuxwtdiqb.supabase.co/storage/v1/object/public/yamu-assets/bimba_articles/1781576524808-ChatGPT%20Image%20Jun%2013,%202026,%2008_34_08%20PM.png	\N	2026-06-16 02:22:05.582033+00
e7bcb9a0-7ed5-4a89-85e6-acf69c8cb431	Bimba Jombang: Bimba bintang junior untuk Anak 3-6 Tahun Metode Fun learning (belajar sambil bermain	PROMOSI	Bingung Cari Bimba di Jombang yang Beneran Fokus ke Anak?\n\nHalo Ayah Bunda di Jombang!\n\nSaya Miss [indah], pengajar di Bimba bintang junior jombang ]. Saya paham banget rasanya pusing liat anak umur 3-6 tahun disuruh baca tapi malah nangis, lari-lari, atau nggak mau duduk.\n\nDi Bimba kami, baca itu = main. Nggak ada PR, nggak ada dipaksa, nggak ada nilai merah.\n\n*Kenapa Ortu di Jombang Pilih Bimba bintang junior jombang? \n\n1. Metode "Mini Steps" Khusus Anak 3-6 Tahun\nKita nggak langsung A-Z. Mulainya dari 5 huruf yang ada di nama anak. Misal: "D-I-M-A-S". Anak jadi bangga duluan karena bisa baca namanya sendiri. Baru nambah pelan-pelan. Dijamin nggak stres.\n\n2. Kelas Kecil, Perhatian Maksimal\n1 kelas max 5 anak aja. Jadi Miss bisa liat semua. Anak yang pemalu ditemenin. Anak yang aktif disalurin energinya ke game huruf. Nggak ada yang ketinggalan.\n\n3. Jam Pas Buat Ibu Ngajar\nKelas buka jam 08.00-12.00. Durasi belajar 1 jam.bisa pilih kelas loh mau seminggu berapa kali pertemuan.Pas banget kan? Ibu yang ngajar sampe jam 3 sore kayak saya juga bisa anter anak les di sini. Nggak tabrakan.\n\n4. Lokasi Gampang: Jombang, Tangerang\nKita di Patokan Dekat: Misal "Deket Stasiun Sudimara / Alfamart Jombang"]. Bisa diantar jemput sama nenek/kak juga aman.\n\nKegiatan Apa Aja Sih di Bimba?\nSenin = Main huruf pake balok kayu 🧱\nRabu = Menghitung 1-20 pake permen warna-warni 🍬\nJumat = Story Time + Mewarnai 🎨\nAnak pulang bawa hasil karya + senyum. Bukan bawa stres.\n\nBerapa Biayanya?\nTenang, ramah kantong IRT 😊\nPendaftaran: Rp 150.000 sekali bayar. Dapat buku + kaos Bimba.\n*Bulanan: tergantung ayah bunda pilih jadwal nya ya \n\n\nYuk, Coba Kelas Trial GRATIS Dulu!\nNggak cocok? Nggak apa-apa, nggak dipungut biaya.\nBiar anak & Miss-nya kenalan dulu.	\N	https://qhqtewsbfqvxuxwtdiqb.supabase.co/storage/v1/object/public/yamu-assets/bimba_articles/1782462718739-cover_promosi.png	\N	2026-06-26 08:32:00.781364+00
\.


--
-- Data for Name: donations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.donations (id, name, amount, program_title, message, created_at, status, program_id, phone, amin_count, order_id) FROM stdin;
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messages (id, name, email, phone, subject, message, created_at) FROM stdin;
\.


--
-- Data for Name: programs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.programs (id, title, category, target, terkumpul, description, image_url, created_at, status) FROM stdin;
\.


--
-- Data for Name: qurban_orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.qurban_orders (id, created_at, nama_donatur, nomor_wa, tipe_qurban, nama_mudhohi, total_bayar, status_pembayaran) FROM stdin;
\.


--
-- Data for Name: qurban_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.qurban_settings (id, status, harga_kambing, harga_sapi_patungan, harga_sapi_utuh, updated_at) FROM stdin;
1	OFF	2500000	3000000	21000000	2026-06-01 03:16:56.436+00
\.


--
-- Data for Name: messages_2026_05_30; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2026_05_30 (topic, extension, payload, event, private, updated_at, inserted_at, id, binary_payload) FROM stdin;
\.


--
-- Data for Name: messages_2026_05_31; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2026_05_31 (topic, extension, payload, event, private, updated_at, inserted_at, id, binary_payload) FROM stdin;
\.


--
-- Data for Name: messages_2026_06_01; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2026_06_01 (topic, extension, payload, event, private, updated_at, inserted_at, id, binary_payload) FROM stdin;
\.


--
-- Data for Name: messages_2026_06_02; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2026_06_02 (topic, extension, payload, event, private, updated_at, inserted_at, id, binary_payload) FROM stdin;
\.


--
-- Data for Name: messages_2026_06_03; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2026_06_03 (topic, extension, payload, event, private, updated_at, inserted_at, id, binary_payload) FROM stdin;
\.


--
-- Data for Name: messages_2026_06_04; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2026_06_04 (topic, extension, payload, event, private, updated_at, inserted_at, id, binary_payload) FROM stdin;
\.


--
-- Data for Name: messages_2026_06_05; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2026_06_05 (topic, extension, payload, event, private, updated_at, inserted_at, id, binary_payload) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.schema_migrations (version, inserted_at) FROM stdin;
20211116024918	2026-03-10 10:43:40
20211116045059	2026-03-10 10:43:40
20211116050929	2026-03-10 10:43:40
20211116051442	2026-03-10 10:43:40
20211116212300	2026-03-10 10:43:40
20211116213355	2026-03-10 10:43:40
20211116213934	2026-03-10 10:43:40
20211116214523	2026-03-10 10:43:40
20211122062447	2026-03-10 10:43:40
20211124070109	2026-03-10 10:43:40
20211202204204	2026-03-10 10:43:40
20211202204605	2026-03-10 10:43:40
20211210212804	2026-03-10 10:43:40
20211228014915	2026-03-10 10:43:41
20220107221237	2026-03-10 10:43:41
20220228202821	2026-03-10 10:43:41
20220312004840	2026-03-10 10:43:41
20220603231003	2026-03-10 10:43:41
20220603232444	2026-03-10 10:43:41
20220615214548	2026-03-10 10:43:41
20220712093339	2026-03-10 10:43:41
20220908172859	2026-03-10 10:43:41
20220916233421	2026-03-10 10:43:41
20230119133233	2026-03-10 10:43:41
20230128025114	2026-03-10 10:43:41
20230128025212	2026-03-10 10:43:41
20230227211149	2026-03-10 10:43:41
20230228184745	2026-03-10 10:43:41
20230308225145	2026-03-10 10:43:41
20230328144023	2026-03-10 10:43:41
20231018144023	2026-03-10 10:43:41
20231204144023	2026-03-10 10:43:42
20231204144024	2026-03-10 10:43:42
20231204144025	2026-03-10 10:43:42
20240108234812	2026-03-10 10:43:42
20240109165339	2026-03-10 10:43:42
20240227174441	2026-03-10 10:43:42
20240311171622	2026-03-10 10:43:42
20240321100241	2026-03-10 10:43:42
20240401105812	2026-03-10 10:43:42
20240418121054	2026-03-10 10:43:42
20240523004032	2026-03-10 10:43:42
20240618124746	2026-03-10 10:43:42
20240801235015	2026-03-10 10:43:42
20240805133720	2026-03-10 10:43:42
20240827160934	2026-03-10 10:43:42
20240919163303	2026-03-10 10:43:42
20240919163305	2026-03-10 10:43:42
20241019105805	2026-03-10 10:43:42
20241030150047	2026-03-10 10:43:42
20241108114728	2026-03-10 10:43:42
20241121104152	2026-03-10 10:43:42
20241130184212	2026-03-10 10:43:42
20241220035512	2026-03-10 10:43:42
20241220123912	2026-03-10 10:43:42
20241224161212	2026-03-10 10:43:42
20250107150512	2026-03-10 10:43:42
20250110162412	2026-03-10 10:43:42
20250123174212	2026-03-10 10:43:42
20250128220012	2026-03-10 10:43:43
20250506224012	2026-03-10 10:43:43
20250523164012	2026-03-10 10:43:43
20250714121412	2026-03-10 10:43:43
20250905041441	2026-03-10 10:43:43
20251103001201	2026-03-10 10:43:43
20251120212548	2026-03-10 10:43:43
20251120215549	2026-03-10 10:43:43
20260218120000	2026-03-10 10:43:43
20260326120000	2026-05-07 08:57:09
20260514120000	2026-06-05 08:19:38
20260527120000	2026-06-05 08:19:38
20260528120000	2026-06-05 08:19:39
20260603120000	2026-06-05 08:19:39
20260605120000	2026-06-16 02:33:58
20260606110000	2026-06-16 02:33:58
20260616120000	2026-06-27 08:14:57
20260624120000	2026-06-27 08:14:57
20260626120000	2026-07-31 12:40:55
20260706120000	2026-07-31 12:40:55
20260707120000	2026-07-31 12:40:55
20260709120000	2026-07-31 12:40:56
\.


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: supabase_realtime_admin
--

COPY realtime.subscription (id, subscription_id, entity, filters, claims, created_at, action_filter, selected_columns) FROM stdin;
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id, type) FROM stdin;
product-images	product-images	\N	2026-03-10 14:13:28.669145+00	2026-03-10 14:13:28.669145+00	t	f	\N	\N	\N	STANDARD
payment-proofs	payment-proofs	\N	2026-03-10 12:01:23.004217+00	2026-03-10 12:01:23.004217+00	t	f	\N	\N	\N	STANDARD
yamu-assets	yamu-assets	\N	2026-05-30 06:20:11.700574+00	2026-05-30 06:20:11.700574+00	t	f	\N	\N	\N	STANDARD
\.


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets_analytics (name, type, format, created_at, updated_at, id, deleted_at) FROM stdin;
\.


--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets_vectors (id, type, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2026-03-10 09:18:46.550973
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2026-03-10 09:18:46.588077
2	storage-schema	f6a1fa2c93cbcd16d4e487b362e45fca157a8dbd	2026-03-10 09:18:46.593769
3	pathtoken-column	2cb1b0004b817b29d5b0a971af16bafeede4b70d	2026-03-10 09:18:46.623818
4	add-migrations-rls	427c5b63fe1c5937495d9c635c263ee7a5905058	2026-03-10 09:18:46.675362
5	add-size-functions	79e081a1455b63666c1294a440f8ad4b1e6a7f84	2026-03-10 09:18:46.681008
6	change-column-name-in-get-size	ded78e2f1b5d7e616117897e6443a925965b30d2	2026-03-10 09:18:46.687144
7	add-rls-to-buckets	e7e7f86adbc51049f341dfe8d30256c1abca17aa	2026-03-10 09:18:46.694383
8	add-public-to-buckets	fd670db39ed65f9d08b01db09d6202503ca2bab3	2026-03-10 09:18:46.699831
9	fix-search-function	af597a1b590c70519b464a4ab3be54490712796b	2026-03-10 09:18:46.705603
10	search-files-search-function	b595f05e92f7e91211af1bbfe9c6a13bb3391e16	2026-03-10 09:18:46.711335
11	add-trigger-to-auto-update-updated_at-column	7425bdb14366d1739fa8a18c83100636d74dcaa2	2026-03-10 09:18:46.717928
12	add-automatic-avif-detection-flag	8e92e1266eb29518b6a4c5313ab8f29dd0d08df9	2026-03-10 09:18:46.723785
13	add-bucket-custom-limits	cce962054138135cd9a8c4bcd531598684b25e7d	2026-03-10 09:18:46.729524
14	use-bytes-for-max-size	941c41b346f9802b411f06f30e972ad4744dad27	2026-03-10 09:18:46.735354
15	add-can-insert-object-function	934146bc38ead475f4ef4b555c524ee5d66799e5	2026-03-10 09:18:46.763076
16	add-version	76debf38d3fd07dcfc747ca49096457d95b1221b	2026-03-10 09:18:46.768672
17	drop-owner-foreign-key	f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101	2026-03-10 09:18:46.774529
18	add_owner_id_column_deprecate_owner	e7a511b379110b08e2f214be852c35414749fe66	2026-03-10 09:18:46.780234
19	alter-default-value-objects-id	02e5e22a78626187e00d173dc45f58fa66a4f043	2026-03-10 09:18:46.787194
20	list-objects-with-delimiter	cd694ae708e51ba82bf012bba00caf4f3b6393b7	2026-03-10 09:18:46.79308
21	s3-multipart-uploads	8c804d4a566c40cd1e4cc5b3725a664a9303657f	2026-03-10 09:18:46.799751
22	s3-multipart-uploads-big-ints	9737dc258d2397953c9953d9b86920b8be0cdb73	2026-03-10 09:18:46.814451
23	optimize-search-function	9d7e604cddc4b56a5422dc68c9313f4a1b6f132c	2026-03-10 09:18:46.825325
24	operation-function	8312e37c2bf9e76bbe841aa5fda889206d2bf8aa	2026-03-10 09:18:46.830962
25	custom-metadata	d974c6057c3db1c1f847afa0e291e6165693b990	2026-03-10 09:18:46.836914
26	objects-prefixes	215cabcb7f78121892a5a2037a09fedf9a1ae322	2026-03-10 09:18:46.8427
27	search-v2	859ba38092ac96eb3964d83bf53ccc0b141663a6	2026-03-10 09:18:46.850912
28	object-bucket-name-sorting	c73a2b5b5d4041e39705814fd3a1b95502d38ce4	2026-03-10 09:18:46.856465
29	create-prefixes	ad2c1207f76703d11a9f9007f821620017a66c21	2026-03-10 09:18:46.861897
30	update-object-levels	2be814ff05c8252fdfdc7cfb4b7f5c7e17f0bed6	2026-03-10 09:18:46.866883
31	objects-level-index	b40367c14c3440ec75f19bbce2d71e914ddd3da0	2026-03-10 09:18:46.873492
32	backward-compatible-index-on-objects	e0c37182b0f7aee3efd823298fb3c76f1042c0f7	2026-03-10 09:18:46.878813
33	backward-compatible-index-on-prefixes	b480e99ed951e0900f033ec4eb34b5bdcb4e3d49	2026-03-10 09:18:46.883752
34	optimize-search-function-v1	ca80a3dc7bfef894df17108785ce29a7fc8ee456	2026-03-10 09:18:46.889188
35	add-insert-trigger-prefixes	458fe0ffd07ec53f5e3ce9df51bfdf4861929ccc	2026-03-10 09:18:46.898185
36	optimise-existing-functions	6ae5fca6af5c55abe95369cd4f93985d1814ca8f	2026-03-10 09:18:46.904695
37	add-bucket-name-length-trigger	3944135b4e3e8b22d6d4cbb568fe3b0b51df15c1	2026-03-10 09:18:46.909835
38	iceberg-catalog-flag-on-buckets	02716b81ceec9705aed84aa1501657095b32e5c5	2026-03-10 09:18:46.915761
39	add-search-v2-sort-support	6706c5f2928846abee18461279799ad12b279b78	2026-03-10 09:18:46.928357
40	fix-prefix-race-conditions-optimized	7ad69982ae2d372b21f48fc4829ae9752c518f6b	2026-03-10 09:18:46.933212
41	add-object-level-update-trigger	07fcf1a22165849b7a029deed059ffcde08d1ae0	2026-03-10 09:18:46.944054
42	rollback-prefix-triggers	771479077764adc09e2ea2043eb627503c034cd4	2026-03-10 09:18:46.951533
43	fix-object-level	84b35d6caca9d937478ad8a797491f38b8c2979f	2026-03-10 09:18:46.957329
44	vector-bucket-type	99c20c0ffd52bb1ff1f32fb992f3b351e3ef8fb3	2026-03-10 09:18:46.962272
45	vector-buckets	049e27196d77a7cb76497a85afae669d8b230953	2026-03-10 09:18:46.967973
46	buckets-objects-grants	fedeb96d60fefd8e02ab3ded9fbde05632f84aed	2026-03-10 09:18:46.982119
47	iceberg-table-metadata	649df56855c24d8b36dd4cc1aeb8251aa9ad42c2	2026-03-10 09:18:46.988198
48	iceberg-catalog-ids	e0e8b460c609b9999ccd0df9ad14294613eed939	2026-03-10 09:18:46.993469
49	buckets-objects-grants-postgres	072b1195d0d5a2f888af6b2302a1938dd94b8b3d	2026-03-10 09:18:47.012869
50	search-v2-optimised	6323ac4f850aa14e7387eb32102869578b5bd478	2026-03-10 09:18:47.018877
51	index-backward-compatible-search	2ee395d433f76e38bcd3856debaf6e0e5b674011	2026-03-10 09:18:47.16465
52	drop-not-used-indexes-and-functions	5cc44c8696749ac11dd0dc37f2a3802075f3a171	2026-03-10 09:18:47.16698
53	drop-index-lower-name	d0cb18777d9e2a98ebe0bc5cc7a42e57ebe41854	2026-03-10 09:18:47.17931
54	drop-index-object-level	6289e048b1472da17c31a7eba1ded625a6457e67	2026-03-10 09:18:47.182585
55	prevent-direct-deletes	262a4798d5e0f2e7c8970232e03ce8be695d5819	2026-03-10 09:18:47.184763
57	s3-multipart-uploads-metadata	f127886e00d1b374fadbc7c6b31e09336aad5287	2026-04-07 01:29:16.434669
58	operation-ergonomics	00ca5d483b3fe0d522133d9002ccc5df98365120	2026-04-07 01:29:16.446865
56	fix-optimized-search-function	b823ed1e418101032fa01374edc9a436e54e3ed4	2026-03-10 09:18:47.191144
59	drop-unused-functions	38456f13e39691c2bbb4b5151d0d1cdbabd4a8c4	2026-05-07 08:56:40.511943
60	optimize-existing-functions-again	db35e1c91a9201e59f4fef8d972c2f277d68b157	2026-05-07 08:56:40.532415
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.objects (id, bucket_id, name, owner, created_at, updated_at, last_accessed_at, metadata, version, owner_id, user_metadata) FROM stdin;
83608f83-550b-4c65-b740-75b614c0a79a	product-images	products/0.5882933521839913.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-03-11 10:14:26.12167+00	2026-03-11 10:14:26.12167+00	2026-03-11 10:14:26.12167+00	{"eTag": "\\"8e436b8215145dcfd0e3dba2107406b3\\"", "size": 254956, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T10:14:27.000Z", "contentLength": 254956, "httpStatusCode": 200}	60757e5b-a03a-44af-a880-ce4516b72e3c	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
2320de86-9423-4139-9ecf-1750d6b8ae60	product-images	products/0.34473075287516475.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-06-01 09:49:41.403629+00	2026-06-01 09:49:41.403629+00	2026-06-01 09:49:41.403629+00	{"eTag": "\\"bcd59bb572621ce85cdbc6d9afcdbf34\\"", "size": 3156287, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-01T09:49:42.000Z", "contentLength": 3156287, "httpStatusCode": 200}	0aa50f06-2ed9-47e5-92b5-d92b5030e742	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
80cada6f-9983-4d8c-b720-54dfc91542d6	product-images	products/0.7244646163185579.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-03-11 10:14:27.981912+00	2026-03-11 10:14:27.981912+00	2026-03-11 10:14:27.981912+00	{"eTag": "\\"8e436b8215145dcfd0e3dba2107406b3\\"", "size": 254956, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T10:14:28.000Z", "contentLength": 254956, "httpStatusCode": 200}	d634a228-f0f6-443c-9cfd-697ce3c6ed05	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
6ef574f2-ad4e-459c-b967-a72a64e8eb6c	product-images	products/1773161693182_485eylldf.jpg	\N	2026-03-10 16:54:54.918107+00	2026-03-10 16:54:54.918107+00	2026-03-10 16:54:54.918107+00	{"eTag": "\\"8e436b8215145dcfd0e3dba2107406b3\\"", "size": 254956, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-10T16:54:55.000Z", "contentLength": 254956, "httpStatusCode": 200}	8b5d565f-3208-433a-94c1-809d1a858bfa	\N	{}
f99d1243-fc63-455d-8174-138120c5402e	product-images	products/0.9332475344619173.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-03-11 10:14:31.431211+00	2026-03-11 10:14:31.431211+00	2026-03-11 10:14:31.431211+00	{"eTag": "\\"8e436b8215145dcfd0e3dba2107406b3\\"", "size": 254956, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T10:14:32.000Z", "contentLength": 254956, "httpStatusCode": 200}	7c7e3fe8-205b-431d-ba00-6a5a73fa2180	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
5a92ed70-e39b-408f-9b19-8d5ce5dfd39d	product-images	products/1773162259461_ojao6i3ho.jpg	\N	2026-03-10 17:04:21.413037+00	2026-03-10 17:04:21.413037+00	2026-03-10 17:04:21.413037+00	{"eTag": "\\"8e436b8215145dcfd0e3dba2107406b3\\"", "size": 254956, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-10T17:04:22.000Z", "contentLength": 254956, "httpStatusCode": 200}	01cb1fb9-d076-4744-9815-1929a4cbed16	\N	{}
187818b1-8748-4e1d-8c9c-7405e254db3b	payment-proofs	receipts/ORDER_1773163961618_dqb0jllyk.jpg	\N	2026-03-10 17:32:44.058863+00	2026-03-10 17:32:44.058863+00	2026-03-10 17:32:44.058863+00	{"eTag": "\\"8e436b8215145dcfd0e3dba2107406b3\\"", "size": 254956, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-10T17:32:45.000Z", "contentLength": 254956, "httpStatusCode": 200}	dc97d098-5fbd-4140-85e6-c26507758a2f	\N	{}
b9ce9a85-06ce-46db-b725-2407491a0aed	product-images	products/0.6460910662639618.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-03-11 10:15:21.238971+00	2026-03-11 10:15:21.238971+00	2026-03-11 10:15:21.238971+00	{"eTag": "\\"8e436b8215145dcfd0e3dba2107406b3\\"", "size": 254956, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T10:15:22.000Z", "contentLength": 254956, "httpStatusCode": 200}	e3d4f6d3-9ae9-4c81-9dc5-8538eab812ed	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
906d93f3-6c20-4823-8fe8-1891fccc5769	payment-proofs	receipts/ORDER_1773164078201_raxjgcb30.jpg	\N	2026-03-10 17:34:40.33784+00	2026-03-10 17:34:40.33784+00	2026-03-10 17:34:40.33784+00	{"eTag": "\\"8e436b8215145dcfd0e3dba2107406b3\\"", "size": 254956, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-10T17:34:41.000Z", "contentLength": 254956, "httpStatusCode": 200}	3f573324-279e-4051-bd85-fc0dd8012ff3	\N	{}
751ff57f-1540-456e-9127-7debb48b1f80	payment-proofs	receipts/ORDER_1773164138225_csjmldcff.jpg	\N	2026-03-10 17:35:40.298689+00	2026-03-10 17:35:40.298689+00	2026-03-10 17:35:40.298689+00	{"eTag": "\\"ea551fbcc7cc154e96ab462c0409f02d\\"", "size": 734059, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-10T17:35:41.000Z", "contentLength": 734059, "httpStatusCode": 200}	7522187a-21f7-4725-992b-43f1fc07434b	\N	{}
c683b82d-0f21-4997-ae4d-bff27ff92604	payment-proofs	receipts/ORDER_1773164529246_qg3bcr1mj.jpg	\N	2026-03-10 17:42:12.302161+00	2026-03-10 17:42:12.302161+00	2026-03-10 17:42:12.302161+00	{"eTag": "\\"279f8e02ea192dfec81e48ffd9ba19ef\\"", "size": 1176403, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-10T17:42:13.000Z", "contentLength": 1176403, "httpStatusCode": 200}	a037d496-6bab-4d9a-bd61-dc16389f918b	\N	{}
142e70d4-6fef-491d-a086-157074c3157d	payment-proofs	receipts/ORDER_1773164573160_h1yy39job.jpg	\N	2026-03-10 17:42:55.26943+00	2026-03-10 17:42:55.26943+00	2026-03-10 17:42:55.26943+00	{"eTag": "\\"20884a2fad5f118b4e5e354e9c044aa8\\"", "size": 782699, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-10T17:42:56.000Z", "contentLength": 782699, "httpStatusCode": 200}	a30b1dc8-ad2a-4d51-853b-971303388f40	\N	{}
0a4273a1-4db0-4735-ba30-f6e06aa3c55e	payment-proofs	receipts/ORDER_1773164603883_ihr91igbn.jpg	\N	2026-03-10 17:43:25.735543+00	2026-03-10 17:43:25.735543+00	2026-03-10 17:43:25.735543+00	{"eTag": "\\"8e436b8215145dcfd0e3dba2107406b3\\"", "size": 254956, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-10T17:43:26.000Z", "contentLength": 254956, "httpStatusCode": 200}	da2d9249-026c-4f21-afda-d499a318da1b	\N	{}
5a102099-b6ac-4f22-8b53-52f484be8ec5	payment-proofs	receipts/ORDER_1773164895699_zsmr4ahno.jpg	\N	2026-03-10 17:48:17.95921+00	2026-03-10 17:48:17.95921+00	2026-03-10 17:48:17.95921+00	{"eTag": "\\"a01ec4bc6c8e6ec9dd1e259e2e674153\\"", "size": 1110757, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-10T17:48:18.000Z", "contentLength": 1110757, "httpStatusCode": 200}	f5560d5d-cc06-42b5-8afe-5fc601f4b791	\N	{}
9e138f40-9f65-4b28-bdf9-f0e94ac02e6e	payment-proofs	receipts/ORDER_1773165570385_z8wyu5ob3.jpg	\N	2026-03-10 17:59:33.075318+00	2026-03-10 17:59:33.075318+00	2026-03-10 17:59:33.075318+00	{"eTag": "\\"8e436b8215145dcfd0e3dba2107406b3\\"", "size": 254956, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-10T17:59:34.000Z", "contentLength": 254956, "httpStatusCode": 200}	173d799b-1fe1-429d-9fe1-df6c86eb2cb9	\N	{}
e4d7c017-c2aa-4bac-b7c6-32f84d0f186b	product-images	products/0.36992869930184713.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-03-11 10:15:27.55176+00	2026-03-11 10:15:27.55176+00	2026-03-11 10:15:27.55176+00	{"eTag": "\\"8e436b8215145dcfd0e3dba2107406b3\\"", "size": 254956, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T10:15:28.000Z", "contentLength": 254956, "httpStatusCode": 200}	2be43ed7-ff69-43aa-81d9-d781847817d6	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
a12f694f-3252-4bbd-9634-9bd78851f428	payment-proofs	receipts/ORDER_1773196386235_g12xz809v.jpg	\N	2026-03-11 02:33:06.426232+00	2026-03-11 02:33:06.426232+00	2026-03-11 02:33:06.426232+00	{"eTag": "\\"65157430cbf62e74382192c478b57b33\\"", "size": 90522, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T02:33:07.000Z", "contentLength": 90522, "httpStatusCode": 200}	92428d74-519a-4661-8de8-2832a8552e08	\N	{}
8adec2e0-6cd3-4e11-954f-25c3339471ce	product-images	products/0.9366641752439114.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-06-01 09:52:23.812393+00	2026-06-01 09:52:23.812393+00	2026-06-01 09:52:23.812393+00	{"eTag": "\\"efda9d7ab4cacbb0df02669792cf19d9\\"", "size": 3282421, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-01T09:52:24.000Z", "contentLength": 3282421, "httpStatusCode": 200}	1b90ec6f-0272-4533-8f21-eca177219ff2	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
06ce6fa7-5527-4ebf-abea-cccad2f1abe7	payment-proofs	receipts/ORDER_1773199062173_98p93er2f.jpg	\N	2026-03-11 03:17:45.889326+00	2026-03-11 03:17:45.889326+00	2026-03-11 03:17:45.889326+00	{"eTag": "\\"8e436b8215145dcfd0e3dba2107406b3\\"", "size": 254956, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T03:17:46.000Z", "contentLength": 254956, "httpStatusCode": 200}	2add12b0-7572-4c99-8293-2d653093b4d1	\N	{}
f8e6ab51-505a-4e59-9beb-191a4adbda1b	product-images	products/0.4415291961008915.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-03-11 10:15:33.750124+00	2026-03-11 10:15:33.750124+00	2026-03-11 10:15:33.750124+00	{"eTag": "\\"8e436b8215145dcfd0e3dba2107406b3\\"", "size": 254956, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T10:15:34.000Z", "contentLength": 254956, "httpStatusCode": 200}	f15dadd5-7942-4717-9cce-679ac92ffaa4	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
b24831de-1471-47aa-a1e9-2a67365b478b	product-images	products/1773199136013_0iul4lr8w.jpg	\N	2026-03-11 03:18:59.499099+00	2026-03-11 03:18:59.499099+00	2026-03-11 03:18:59.499099+00	{"eTag": "\\"8e436b8215145dcfd0e3dba2107406b3\\"", "size": 254956, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T03:19:00.000Z", "contentLength": 254956, "httpStatusCode": 200}	311b0c00-993c-4607-8bd5-daa345ace7d8	\N	{}
ec1206a0-9750-40d8-ba4b-199cdf6c30d5	product-images	products/0.5512973122925963.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-03-14 04:26:53.711829+00	2026-03-14 04:26:53.711829+00	2026-03-14 04:26:53.711829+00	{"eTag": "\\"cb4dfc851140661171c32e43ac668870\\"", "size": 100985, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-14T04:26:54.000Z", "contentLength": 100985, "httpStatusCode": 200}	f519cb1b-9771-4a67-94d7-23af4b1b6b45	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
b218ca82-bb55-4e0a-8e84-4bb17b9d6f74	product-images	products/1773199975806_v69mmdwx6.png	\N	2026-03-11 03:32:59.597241+00	2026-03-11 03:32:59.597241+00	2026-03-11 03:32:59.597241+00	{"eTag": "\\"89ee1dc8985d95738b90060c53bad1a2\\"", "size": 401044, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T03:33:00.000Z", "contentLength": 401044, "httpStatusCode": 200}	61704336-2613-4209-8cb4-95796b20e56a	\N	{}
f33816b9-eae7-400a-8afb-0086f54c73fb	payment-proofs	receipts/ORDER_1773200000073_6qbvsisnt.png	\N	2026-03-11 03:33:23.576309+00	2026-03-11 03:33:23.576309+00	2026-03-11 03:33:23.576309+00	{"eTag": "\\"89ee1dc8985d95738b90060c53bad1a2\\"", "size": 401044, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T03:33:24.000Z", "contentLength": 401044, "httpStatusCode": 200}	69544b02-1a82-498e-91cf-2a6b66fb913f	\N	{}
13aa29e7-23aa-423a-a8ce-7db1932ffe16	product-images	products/0.5653454135980425.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-03-14 04:27:50.247787+00	2026-03-14 04:27:50.247787+00	2026-03-14 04:27:50.247787+00	{"eTag": "\\"cb4dfc851140661171c32e43ac668870\\"", "size": 100985, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-14T04:27:51.000Z", "contentLength": 100985, "httpStatusCode": 200}	3556d511-46a9-4475-9ee0-ab1ee11dcea3	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
49d3bccf-c08c-4454-a2f2-9cfd578c2d19	payment-proofs	receipts/ORDER_1773200107568_bvawgpdgn.jpg	\N	2026-03-11 03:35:09.645939+00	2026-03-11 03:35:09.645939+00	2026-03-11 03:35:09.645939+00	{"eTag": "\\"3ac50e9e7fae04e8f158d297b4612b4c\\"", "size": 1244241, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T03:35:10.000Z", "contentLength": 1244241, "httpStatusCode": 200}	e5acdb3e-db28-4378-809c-6be3a2dc2f03	\N	{}
cbfa6625-c4ff-4087-b589-cd25acdda23a	payment-proofs	receipts/ORDER_1773200849659_vy5fetyyy.png	\N	2026-03-11 03:47:33.233512+00	2026-03-11 03:47:33.233512+00	2026-03-11 03:47:33.233512+00	{"eTag": "\\"89ee1dc8985d95738b90060c53bad1a2\\"", "size": 401044, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T03:47:34.000Z", "contentLength": 401044, "httpStatusCode": 200}	cad344ac-4e0e-49d8-9165-11b16fef0e47	\N	{}
6f0f7546-cd7d-4cdb-ab24-3e26ae778b0d	payment-proofs	receipts/ORDER_1773201113849_lkmo4ejy8.jpg	\N	2026-03-11 03:51:56.022949+00	2026-03-11 03:51:56.022949+00	2026-03-11 03:51:56.022949+00	{"eTag": "\\"a9bb797f1dc562cf581a7e5177dbcc3a\\"", "size": 1180142, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T03:51:57.000Z", "contentLength": 1180142, "httpStatusCode": 200}	7fb9de67-cc5b-402e-8482-7bafa9cc719c	\N	{}
a07d9e5d-28b3-4ae5-94fe-df2c4cff4ceb	payment-proofs	receipts/ORDER_1773201647631_9q8i0pioc.jpg	\N	2026-03-11 04:00:49.811766+00	2026-03-11 04:00:49.811766+00	2026-03-11 04:00:49.811766+00	{"eTag": "\\"3ac50e9e7fae04e8f158d297b4612b4c\\"", "size": 1244241, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T04:00:50.000Z", "contentLength": 1244241, "httpStatusCode": 200}	479e7b9f-c4f0-4344-a5e7-91ce12a5a3ad	\N	{}
fbd2e4d0-4098-4981-80f1-37362e54c671	product-images	products/1773204918446_3s9lxs5je.png	\N	2026-03-11 04:55:22.051273+00	2026-03-11 04:55:22.051273+00	2026-03-11 04:55:22.051273+00	{"eTag": "\\"38ec3c5c97918c462b2d5145fba392a0\\"", "size": 239973, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T04:55:23.000Z", "contentLength": 239973, "httpStatusCode": 200}	cf03eea4-a03d-4273-ad56-119fecbe3052	\N	{}
efe74bd4-db7c-45ef-8637-cdb250ca9888	payment-proofs	receipts/ORDER_1773205019323_qaq5286yz.jpg	\N	2026-03-11 04:57:02.337338+00	2026-03-11 04:57:02.337338+00	2026-03-11 04:57:02.337338+00	{"eTag": "\\"4d550c8a33e70a74bde3af260c6a1280\\"", "size": 1231970, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T04:57:03.000Z", "contentLength": 1231970, "httpStatusCode": 200}	497a711e-72cf-42d2-88b9-7d74a1b5bc58	\N	{}
4a9d70d4-ddc2-488e-8eac-4318d79e46f8	payment-proofs	receipts/ORDER_1773205580343_kx4nbejnr.jpg	\N	2026-03-11 05:06:22.776232+00	2026-03-11 05:06:22.776232+00	2026-03-11 05:06:22.776232+00	{"eTag": "\\"a9bb797f1dc562cf581a7e5177dbcc3a\\"", "size": 1180142, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T05:06:23.000Z", "contentLength": 1180142, "httpStatusCode": 200}	932084fe-c0eb-425e-acbf-20a63572e257	\N	{}
19e2277c-de8f-4e3e-9243-b806a1c96b8e	product-images	products/1773458734726_lrexqyq6u.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-03-14 03:25:43.045042+00	2026-03-14 03:25:43.045042+00	2026-03-14 03:25:43.045042+00	{"eTag": "\\"bf658aa5e81b356f4d448426f4b01cec\\"", "size": 85049, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-14T03:25:44.000Z", "contentLength": 85049, "httpStatusCode": 200}	3035eed5-2d49-45bc-86ca-0820efe76553	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
8a0fe9e2-6a9a-43f8-bf0a-8f0954b2cf7f	payment-proofs	receipts/ORDER_1773206730676_u57hz5f5u.jpg	\N	2026-03-11 05:25:32.799137+00	2026-03-11 05:25:32.799137+00	2026-03-11 05:25:32.799137+00	{"eTag": "\\"a9bb797f1dc562cf581a7e5177dbcc3a\\"", "size": 1180142, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T05:25:33.000Z", "contentLength": 1180142, "httpStatusCode": 200}	366afbaf-2d52-4380-a8f3-f58c8347e827	\N	{}
5fd9a623-414f-46a9-a59f-4f3a202a84f1	product-images	products/0.21932621284846865.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-06-01 09:57:25.911504+00	2026-06-01 09:57:25.911504+00	2026-06-01 09:57:25.911504+00	{"eTag": "\\"4c3ca7f326f6bb530529eac73addb9cf\\"", "size": 3445207, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-01T09:57:26.000Z", "contentLength": 3445207, "httpStatusCode": 200}	fda4ffa6-d096-4f86-be4b-aabc5ad2d530	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
61868e72-7c98-410f-a51c-54d419915274	payment-proofs	receipts/ORDER_1773206908997_fyjez9mnz.jpg	\N	2026-03-11 05:28:31.188119+00	2026-03-11 05:28:31.188119+00	2026-03-11 05:28:31.188119+00	{"eTag": "\\"3ac50e9e7fae04e8f158d297b4612b4c\\"", "size": 1244241, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T05:28:32.000Z", "contentLength": 1244241, "httpStatusCode": 200}	a8d1c8ce-545e-4d95-b3fc-0b8265cc0b6f	\N	{}
591f6bcd-20dc-4bd0-a91f-99de479b65bd	product-images	products/1773458819331_sy6wx18vl.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-03-14 03:27:07.434314+00	2026-03-14 03:27:07.434314+00	2026-03-14 03:27:07.434314+00	{"eTag": "\\"6ffc81845b32d8db992f56d173e8749e\\"", "size": 196291, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-14T03:27:08.000Z", "contentLength": 196291, "httpStatusCode": 200}	c4941bcf-a1b6-407c-96e1-80c1c43a35cb	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
0300204f-4d8b-4867-855a-70bcea595f6f	payment-proofs	receipts/ORDER_1773207140936_2toekv49n.jpg	\N	2026-03-11 05:32:23.121963+00	2026-03-11 05:32:23.121963+00	2026-03-11 05:32:23.121963+00	{"eTag": "\\"4d550c8a33e70a74bde3af260c6a1280\\"", "size": 1231970, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T05:32:24.000Z", "contentLength": 1231970, "httpStatusCode": 200}	ba19117a-960b-4894-abb2-d0987922627a	\N	{}
da3e3434-1582-4451-b2f3-b1a4b451ef44	payment-proofs	receipts/ORDER_1773207379037_k3p8yws7r.jpg	\N	2026-03-11 05:36:21.221441+00	2026-03-11 05:36:21.221441+00	2026-03-11 05:36:21.221441+00	{"eTag": "\\"d4181c069acd171fb83d83fe0568b900\\"", "size": 1196892, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T05:36:22.000Z", "contentLength": 1196892, "httpStatusCode": 200}	c0c290ad-04e0-4f62-bcf3-b8935719691c	\N	{}
584f26d3-ee82-4057-a4bb-57b7606f08a2	product-images	products/1773458856715_qrcg9da0i.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-03-14 03:27:44.958642+00	2026-03-14 03:27:44.958642+00	2026-03-14 03:27:44.958642+00	{"eTag": "\\"c334f914c6e5c3aef35c5ca0d3edb9a8\\"", "size": 189038, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-14T03:27:45.000Z", "contentLength": 189038, "httpStatusCode": 200}	d8471a1e-8bcd-43cc-a269-ac9d2326c2ce	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
943d0ab0-e0be-4f77-bc3e-8e4e3489ddc1	payment-proofs	receipts/ORDER_1773207836349_kuzpgsjov.jpg	\N	2026-03-11 05:43:58.596047+00	2026-03-11 05:43:58.596047+00	2026-03-11 05:43:58.596047+00	{"eTag": "\\"4d550c8a33e70a74bde3af260c6a1280\\"", "size": 1231970, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T05:43:59.000Z", "contentLength": 1231970, "httpStatusCode": 200}	55585e7e-6c8d-4b20-a628-b3665240467a	\N	{}
652c1ce0-202e-4312-b466-6f0cd795651e	payment-proofs	receipts/ORDER_1773209788827_dn5035v9a.jpg	\N	2026-03-11 06:16:30.263831+00	2026-03-11 06:16:30.263831+00	2026-03-11 06:16:30.263831+00	{"eTag": "\\"aa920036f012c6976577cf376d1924db\\"", "size": 1627643, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T06:16:31.000Z", "contentLength": 1627643, "httpStatusCode": 200}	d518b417-4f3a-4169-b454-ef82d05ca42c	\N	{}
81f849dd-c15d-4233-933b-63ff2924901f	payment-proofs	receipts/ORDER_1773209815965_4r9taddd8.jpg	\N	2026-03-11 06:16:57.443949+00	2026-03-11 06:16:57.443949+00	2026-03-11 06:16:57.443949+00	{"eTag": "\\"aa920036f012c6976577cf376d1924db\\"", "size": 1627643, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T06:16:58.000Z", "contentLength": 1627643, "httpStatusCode": 200}	ce4ca481-c318-4a93-ace3-3971455e68de	\N	{}
bf445409-e965-435c-9430-7e69f92af03d	payment-proofs	receipts/ORDER_1773210019224_2bmj5dhkf.png	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-03-11 06:20:22.67297+00	2026-03-11 06:20:22.67297+00	2026-03-11 06:20:22.67297+00	{"eTag": "\\"86a12e08ee5b8a89c2873b5c5a792f61\\"", "size": 83914, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T06:20:23.000Z", "contentLength": 83914, "httpStatusCode": 200}	495145bc-a4fd-4394-931a-b3b04ce4c438	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
81019196-cc94-4342-ab94-06d4c719ef83	payment-proofs	receipts/ORDER_1773210145495_4pw0xbw44.jpg	\N	2026-03-11 06:22:26.572538+00	2026-03-11 06:22:26.572538+00	2026-03-11 06:22:26.572538+00	{"eTag": "\\"52286d7fbb2df751464e84eb31a82809\\"", "size": 229521, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T06:22:27.000Z", "contentLength": 229521, "httpStatusCode": 200}	4ffa3d0b-92d6-4795-84ba-08e1d2269112	\N	{}
595b2d66-f523-4706-8c9d-55f8ce07ffaf	payment-proofs	receipts/ORDER_1773210172423_dkp1umnbq.jpg	\N	2026-03-11 06:22:53.398665+00	2026-03-11 06:22:53.398665+00	2026-03-11 06:22:53.398665+00	{"eTag": "\\"52286d7fbb2df751464e84eb31a82809\\"", "size": 229521, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T06:22:54.000Z", "contentLength": 229521, "httpStatusCode": 200}	142b4c0e-5c10-4bc8-9cf2-22b5009330c8	\N	{}
68d6acad-b1c0-4c64-9bb3-737686a8787c	product-images	products/0.7641913992856476.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-03-14 03:48:03.872913+00	2026-03-14 03:48:03.872913+00	2026-03-14 03:48:03.872913+00	{"eTag": "\\"c334f914c6e5c3aef35c5ca0d3edb9a8\\"", "size": 189038, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-14T03:48:04.000Z", "contentLength": 189038, "httpStatusCode": 200}	a9864f7f-aeda-43fd-a04c-6f4a67efad74	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
34f43be5-60b5-4e5f-bbd0-49aad3a2b674	payment-proofs	receipts/ORDER_1773210210292_4e6wxw6zz.png	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-03-11 06:23:33.962316+00	2026-03-11 06:23:33.962316+00	2026-03-11 06:23:33.962316+00	{"eTag": "\\"86a12e08ee5b8a89c2873b5c5a792f61\\"", "size": 83914, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T06:23:34.000Z", "contentLength": 83914, "httpStatusCode": 200}	5a107735-66b8-4f77-a995-5aa67cce0db9	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
01750d25-9ef9-49f0-b4e6-e34a1cf68221	payment-proofs	receipts/ORDER_1773210307177_mgptrovu6.jpg	\N	2026-03-11 06:25:08.269042+00	2026-03-11 06:25:08.269042+00	2026-03-11 06:25:08.269042+00	{"eTag": "\\"52286d7fbb2df751464e84eb31a82809\\"", "size": 229521, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T06:25:09.000Z", "contentLength": 229521, "httpStatusCode": 200}	752b4ff5-4a58-4aec-875a-20570a54faa0	\N	{}
a7aca9c5-4397-49cb-bd62-f9dc10011ef8	product-images	products/0.8440092935758668.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-03-14 03:49:59.3351+00	2026-03-14 03:49:59.3351+00	2026-03-14 03:49:59.3351+00	{"eTag": "\\"6ffc81845b32d8db992f56d173e8749e\\"", "size": 196291, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-14T03:50:00.000Z", "contentLength": 196291, "httpStatusCode": 200}	d02a39d5-72bb-480b-a8bc-b82e5cb95639	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
dab2ba92-9175-4794-abd2-5c23cae24955	payment-proofs	receipts/ORDER_1773210684703_1ny559ofd.jpg	\N	2026-03-11 06:31:26.300841+00	2026-03-11 06:31:26.300841+00	2026-03-11 06:31:26.300841+00	{"eTag": "\\"06d312162a802410578350bd3e2bcc3b\\"", "size": 688986, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T06:31:27.000Z", "contentLength": 688986, "httpStatusCode": 200}	7dc01e5e-0da0-44e7-9a96-7340e177fc84	\N	{}
e955c895-b944-4fdf-8418-8c33f071e472	product-images	products/0.8041085645048351.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-06-01 09:59:25.93027+00	2026-06-01 09:59:25.93027+00	2026-06-01 09:59:25.93027+00	{"eTag": "\\"269ba6fee199be503589146319464396\\"", "size": 3484940, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-01T09:59:26.000Z", "contentLength": 3484940, "httpStatusCode": 200}	de5a904b-c161-4613-aae1-65a6029e64c7	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
7dd2fe34-2431-4681-8a64-82e3e5ab7b6f	payment-proofs	receipts/ORDER_1773210968066_m6qx6ep78.jpg	\N	2026-03-11 06:36:10.287111+00	2026-03-11 06:36:10.287111+00	2026-03-11 06:36:10.287111+00	{"eTag": "\\"aa920036f012c6976577cf376d1924db\\"", "size": 1627643, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T06:36:11.000Z", "contentLength": 1627643, "httpStatusCode": 200}	e1d1070d-33d2-4809-a615-b69e20cb1866	\N	{}
a4a81c71-6c65-4a16-b338-e554671aae55	product-images	products/0.8447616379909049.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-03-14 03:51:45.12339+00	2026-03-14 03:51:45.12339+00	2026-03-14 03:51:45.12339+00	{"eTag": "\\"0a4438e5147cfd7cdc711bacaf5433f4\\"", "size": 466400, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-14T03:51:46.000Z", "contentLength": 466400, "httpStatusCode": 200}	17fb4c95-3ef7-49b3-8032-de840b53f05b	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
6c278411-ba8f-43b8-a3c6-c95f6af7f1da	payment-proofs	receipts/ORDER_1773211135622_kl5me7abp.jpg	\N	2026-03-11 06:38:57.373524+00	2026-03-11 06:38:57.373524+00	2026-03-11 06:38:57.373524+00	{"eTag": "\\"aa920036f012c6976577cf376d1924db\\"", "size": 1627643, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T06:38:58.000Z", "contentLength": 1627643, "httpStatusCode": 200}	8aded4ee-aa20-4214-b3da-8f36d75de824	\N	{}
4a945af2-7a71-4cca-a3bc-2eb0115fcdc5	payment-proofs	receipts/ORDER_1773211249572_6hx2xjw6d.jpg	\N	2026-03-11 06:40:51.120824+00	2026-03-11 06:40:51.120824+00	2026-03-11 06:40:51.120824+00	{"eTag": "\\"aa920036f012c6976577cf376d1924db\\"", "size": 1627643, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T06:40:52.000Z", "contentLength": 1627643, "httpStatusCode": 200}	431ce3b6-9384-4a94-980f-903532e3401b	\N	{}
aff60b27-dfe2-4145-823a-4f94b25cd5fe	payment-proofs	receipts/ORDER_1773211845545_iyebs2i1c.jpg	\N	2026-03-11 06:50:47.016522+00	2026-03-11 06:50:47.016522+00	2026-03-11 06:50:47.016522+00	{"eTag": "\\"311f50b7b956fd25583c42ea517db398\\"", "size": 1241333, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T06:50:48.000Z", "contentLength": 1241333, "httpStatusCode": 200}	190e6101-d1da-4f01-b824-3debc896bffe	\N	{}
7f4986d2-bcfd-46e7-9c80-08234413e447	payment-proofs	receipts/ORDER_1773212086567_8yz0zpik7.jpg	\N	2026-03-11 06:54:48.113619+00	2026-03-11 06:54:48.113619+00	2026-03-11 06:54:48.113619+00	{"eTag": "\\"aa920036f012c6976577cf376d1924db\\"", "size": 1627643, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T06:54:49.000Z", "contentLength": 1627643, "httpStatusCode": 200}	7654e18b-5aac-4505-8044-735f615c10b0	\N	{}
0befe12c-6646-424b-8406-199106ddff29	payment-proofs	receipts/ORDER_1773212188370_axrzqhplc.jpg	\N	2026-03-11 06:56:29.679619+00	2026-03-11 06:56:29.679619+00	2026-03-11 06:56:29.679619+00	{"eTag": "\\"311f50b7b956fd25583c42ea517db398\\"", "size": 1241333, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T06:56:30.000Z", "contentLength": 1241333, "httpStatusCode": 200}	f9009f83-a0e0-46d1-ba10-7b1e2c7fc5e9	\N	{}
ab0d477b-f8c0-489f-ba6f-c3951305d238	payment-proofs	receipts/ORDER_1773212297842_0zyoe1xo9.jpg	\N	2026-03-11 06:58:19.2308+00	2026-03-11 06:58:19.2308+00	2026-03-11 06:58:19.2308+00	{"eTag": "\\"311f50b7b956fd25583c42ea517db398\\"", "size": 1241333, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T06:58:20.000Z", "contentLength": 1241333, "httpStatusCode": 200}	f77531a2-962e-411d-9138-8818dcf5649f	\N	{}
6de08a80-e983-435d-abc2-585b31a5ee0a	payment-proofs	receipts/ORDER_1773212744840_qpo27ofx4.jpg	\N	2026-03-11 07:05:47.082628+00	2026-03-11 07:05:47.082628+00	2026-03-11 07:05:47.082628+00	{"eTag": "\\"aa920036f012c6976577cf376d1924db\\"", "size": 1627643, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T07:05:48.000Z", "contentLength": 1627643, "httpStatusCode": 200}	41745059-d282-428c-9ae9-13cdd5e30bc0	\N	{}
ddffa3cc-707f-48c9-9f8e-3ff614a742a5	product-images	products/0.6664686662297636.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-03-14 03:56:47.88731+00	2026-03-14 03:56:47.88731+00	2026-03-14 03:56:47.88731+00	{"eTag": "\\"0a4438e5147cfd7cdc711bacaf5433f4\\"", "size": 466400, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-14T03:56:48.000Z", "contentLength": 466400, "httpStatusCode": 200}	aa5b6d53-a101-4410-bf2f-c141c7c63445	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
5920429a-09e7-4c3f-8a10-ef40a8cbf1fc	payment-proofs	receipts/ORDER_1773213149668_642ovr517.jpg	\N	2026-03-11 07:12:31.236508+00	2026-03-11 07:12:31.236508+00	2026-03-11 07:12:31.236508+00	{"eTag": "\\"311f50b7b956fd25583c42ea517db398\\"", "size": 1241333, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T07:12:32.000Z", "contentLength": 1241333, "httpStatusCode": 200}	ee42e174-a96c-4f28-a6a4-9eb75228e13c	\N	{}
9d6a079e-b5db-4f7b-b3d8-7b99cba070c0	payment-proofs	receipts/ORDER_1773213773898_hco01ih7r.jpg	\N	2026-03-11 07:22:55.5732+00	2026-03-11 07:22:55.5732+00	2026-03-11 07:22:55.5732+00	{"eTag": "\\"836c445f964fe79c1c745ecbde3a0c3f\\"", "size": 2798975, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T07:22:56.000Z", "contentLength": 2798975, "httpStatusCode": 200}	b379a699-1c93-4193-8ee3-33439a281166	\N	{}
7945cfaf-022e-4eae-9b81-ed7ab06fc8fb	product-images	products/0.40018135952689193.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-03-14 03:59:03.756744+00	2026-03-14 03:59:03.756744+00	2026-03-14 03:59:03.756744+00	{"eTag": "\\"0a4438e5147cfd7cdc711bacaf5433f4\\"", "size": 466400, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-14T03:59:04.000Z", "contentLength": 466400, "httpStatusCode": 200}	11d6b363-e74a-4187-b80a-63059212242d	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
551b55af-bf79-4d5b-8d71-db33665afa76	payment-proofs	receipts/ORDER_1773213947627_k06k2ll9e.jpg	\N	2026-03-11 07:25:49.70278+00	2026-03-11 07:25:49.70278+00	2026-03-11 07:25:49.70278+00	{"eTag": "\\"aa920036f012c6976577cf376d1924db\\"", "size": 1627643, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T07:25:50.000Z", "contentLength": 1627643, "httpStatusCode": 200}	bdfeefa2-fdcc-4450-b3a8-3291c8ee4f6c	\N	{}
06b73936-2fd9-4fa4-8487-e3104e73b4f4	product-images	products/0.2042311898334781.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-06-01 10:00:34.344492+00	2026-06-01 10:00:34.344492+00	2026-06-01 10:00:34.344492+00	{"eTag": "\\"f0bef9c6b2f4ead685f65ac8d77a9ce4\\"", "size": 3160167, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-01T10:00:35.000Z", "contentLength": 3160167, "httpStatusCode": 200}	f08c2313-bf50-47e5-bc96-0d19f9a00398	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
bf746062-ef75-453c-aa79-1a4ac1300918	payment-proofs	receipts/ORDER_1773220907534_v1s2abczo.jpg	\N	2026-03-11 09:21:47.656698+00	2026-03-11 09:21:47.656698+00	2026-03-11 09:21:47.656698+00	{"eTag": "\\"eda5859eb9ed9f19499f428d8b526696\\"", "size": 29266, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-11T09:21:48.000Z", "contentLength": 29266, "httpStatusCode": 200}	30a4db86-4aaf-4a76-94f7-61089b0437e7	\N	{}
7fd72816-228c-40e2-9d90-7de65ef231b8	product-images	products/0.9303322126663855.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-03-14 04:08:55.353667+00	2026-03-14 04:08:55.353667+00	2026-03-14 04:08:55.353667+00	{"eTag": "\\"599053f5c73d375b7c7778af0ce64447\\"", "size": 70305, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-14T04:08:56.000Z", "contentLength": 70305, "httpStatusCode": 200}	cff9eb35-7c48-4f47-8284-78cf45699acf	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
1910cbc6-3ac2-4f37-a0d5-467bc0cc6b1f	product-images	products/0.43514267228616255.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-03-14 04:23:59.025325+00	2026-03-14 04:23:59.025325+00	2026-03-14 04:23:59.025325+00	{"eTag": "\\"0fe0ef7c6227c4677ab986d8eae1179d\\"", "size": 80909, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-14T04:24:00.000Z", "contentLength": 80909, "httpStatusCode": 200}	4772ad65-9b54-4d25-bab3-6b39c0f01f16	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
02f07f3d-13ff-42ce-abb0-bdd4e3308985	product-images	products/0.9439888396002355.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-03-14 04:25:14.921321+00	2026-03-14 04:25:14.921321+00	2026-03-14 04:25:14.921321+00	{"eTag": "\\"79337d2d6009e7ca0200d5f961d523e2\\"", "size": 31011, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-14T04:25:15.000Z", "contentLength": 31011, "httpStatusCode": 200}	a0d9f9ad-0f89-4405-a013-1bdcd7229fd1	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
3d667526-ba86-4ada-8926-9a9bb8b0e40e	product-images	products/0.4384998126512285.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-03-14 04:28:35.46204+00	2026-03-14 04:28:35.46204+00	2026-03-14 04:28:35.46204+00	{"eTag": "\\"cb4dfc851140661171c32e43ac668870\\"", "size": 100985, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-14T04:28:36.000Z", "contentLength": 100985, "httpStatusCode": 200}	ab51efc4-146c-4ff0-9f72-5eb19a1a6137	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
fdbdcb3a-6c97-43c5-a86f-f5e9e74f4695	product-images	products/0.8294618035151953.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-03-14 04:29:17.683643+00	2026-03-14 04:29:17.683643+00	2026-03-14 04:29:17.683643+00	{"eTag": "\\"cb4dfc851140661171c32e43ac668870\\"", "size": 100985, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-14T04:29:18.000Z", "contentLength": 100985, "httpStatusCode": 200}	c0649a61-f3a1-4f9e-9d42-12c997d6d63c	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
91228e5a-b805-48ef-9e76-ba83aa1277bf	product-images	products/0.422453288077112.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-03-14 04:31:02.875257+00	2026-03-14 04:31:02.875257+00	2026-03-14 04:31:02.875257+00	{"eTag": "\\"b08e92e9606e8a0a00ebe96ab28b0e68\\"", "size": 33763, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-14T04:31:03.000Z", "contentLength": 33763, "httpStatusCode": 200}	4d811b1d-56d5-4e80-9e73-bff1b242f14c	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
5e40cd4f-e6a4-4595-8eeb-c80bd78629e8	payment-proofs	receipts/ORDER_1773463759059_cq60wklwv.jpg	\N	2026-03-14 04:49:27.433406+00	2026-03-14 04:49:27.433406+00	2026-03-14 04:49:27.433406+00	{"eTag": "\\"6ffc81845b32d8db992f56d173e8749e\\"", "size": 196291, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-14T04:49:28.000Z", "contentLength": 196291, "httpStatusCode": 200}	db092033-64b4-4710-a28f-bda042cc7731	\N	{}
d75ffc99-bfd9-4009-b599-31fb9d1cc791	product-images	products/0.2112298828369329.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-06-01 10:06:14.249457+00	2026-06-01 10:06:14.249457+00	2026-06-01 10:06:14.249457+00	{"eTag": "\\"1cd9b7fdcd3220664e28e48633133d72\\"", "size": 3660607, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-01T10:06:15.000Z", "contentLength": 3660607, "httpStatusCode": 200}	b052dc00-435f-49f4-ad93-51d3085a628f	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
73c0ca18-cb36-41ac-8980-9451173a71e6	payment-proofs	receipts/ORDER_1773463923216_wv27cvw4b.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-03-14 04:52:11.360637+00	2026-03-14 04:52:11.360637+00	2026-03-14 04:52:11.360637+00	{"eTag": "\\"cb4dfc851140661171c32e43ac668870\\"", "size": 100985, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-14T04:52:12.000Z", "contentLength": 100985, "httpStatusCode": 200}	e4a0b469-87be-413c-ac0d-1a70dc0f5dea	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
9662db7a-9c7f-4c78-bbe6-fd2258e22200	payment-proofs	receipts/ORDER_1773463988709_sy79o5b8r.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-03-14 04:53:16.813862+00	2026-03-14 04:53:16.813862+00	2026-03-14 04:53:16.813862+00	{"eTag": "\\"6ffc81845b32d8db992f56d173e8749e\\"", "size": 196291, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-14T04:53:17.000Z", "contentLength": 196291, "httpStatusCode": 200}	e0a9c4d0-32d3-4cbe-a46d-6c8b2a1a33fe	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
a0aed44a-c079-4125-8be1-b58e82545d3d	product-images	products/0.5278703452352294.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-06-01 10:09:14.448062+00	2026-06-01 10:09:14.448062+00	2026-06-01 10:09:14.448062+00	{"eTag": "\\"58edd01ceab7640c40843dbed94a8592\\"", "size": 3135337, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-01T10:09:15.000Z", "contentLength": 3135337, "httpStatusCode": 200}	d54aa8fa-dd5c-4332-97e2-634a3eb7bf11	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
06da39bb-6450-4c28-bb14-c8654966c8cd	payment-proofs	receipts/ORDER_1773464984436_9c6rlldxr.jpg	\N	2026-03-14 05:09:52.585357+00	2026-03-14 05:09:52.585357+00	2026-03-14 05:09:52.585357+00	{"eTag": "\\"b08e92e9606e8a0a00ebe96ab28b0e68\\"", "size": 33763, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-14T05:09:53.000Z", "contentLength": 33763, "httpStatusCode": 200}	ab7fc9fb-c4b3-4736-8ae1-0187d4dccae0	\N	{}
f099b15d-9a53-4781-80af-61fdcf5a1a2a	payment-proofs	receipts/ORDER_1779537834286_iy06d7hi5.png	\N	2026-05-23 12:03:57.045756+00	2026-05-23 12:03:57.045756+00	2026-05-23 12:03:57.045756+00	{"eTag": "\\"8ebaddb9222b43d7a453c5a9557aa6e7\\"", "size": 445694, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-05-23T12:03:57.000Z", "contentLength": 445694, "httpStatusCode": 200}	59fc93bc-a169-4cb8-ab60-e0f23351eeca	\N	{}
d106ce4e-454c-4970-8bb6-e1fc88748bc0	payment-proofs	receipts/ORDER_1779537834496_jui825c00.png	\N	2026-05-23 12:03:57.717534+00	2026-05-23 12:03:57.717534+00	2026-05-23 12:03:57.717534+00	{"eTag": "\\"8ebaddb9222b43d7a453c5a9557aa6e7\\"", "size": 445694, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-05-23T12:03:58.000Z", "contentLength": 445694, "httpStatusCode": 200}	1a6a3962-7948-47fe-90e2-9c50c14916d8	\N	{}
1309b344-8b24-4b86-be6f-73502e5d90b9	payment-proofs	receipts/ORDER_1779538301825_h5m432tvl.jpg	\N	2026-05-23 12:11:47.606077+00	2026-05-23 12:11:47.606077+00	2026-05-23 12:11:47.606077+00	{"eTag": "\\"34979f9d36819671e7bcb793236d64f6\\"", "size": 1116280, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-23T12:11:48.000Z", "contentLength": 1116280, "httpStatusCode": 200}	755eb011-456d-4d18-ac2c-c07d5da5b77d	\N	{}
894f4e73-d507-4055-96ee-0eea7bf58d3d	product-images	products/0.9504919110709991.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-05-25 01:15:28.62457+00	2026-05-25 01:15:28.62457+00	2026-05-25 01:15:28.62457+00	{"eTag": "\\"4aa0c5f04f6092315dc7d632b20c666b\\"", "size": 4175566, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-25T01:15:29.000Z", "contentLength": 4175566, "httpStatusCode": 200}	739ab362-0a0a-40d1-8388-ee0288803548	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
a44e181c-1e13-4b14-beb2-c1bf18a8ba85	product-images	products/0.7040173472210208.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-05-25 01:17:30.036564+00	2026-05-25 01:17:30.036564+00	2026-05-25 01:17:30.036564+00	{"eTag": "\\"796ea8b54ee34a767df149e34fef9b28\\"", "size": 3730400, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-25T01:17:30.000Z", "contentLength": 3730400, "httpStatusCode": 200}	96af1191-22ef-48fc-bef1-6e52e8bacdd3	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
195cdc14-6d2d-4fb4-9895-7615d5daffa8	product-images	products/0.1606844393999196.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-05-25 01:31:25.154645+00	2026-05-25 01:31:25.154645+00	2026-05-25 01:31:25.154645+00	{"eTag": "\\"997f335b2367d53bd9a962b1321a2691\\"", "size": 43716, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-25T01:31:26.000Z", "contentLength": 43716, "httpStatusCode": 200}	da39daad-67cf-4d0e-bb35-d8ffb6d28bdb	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
4cb8e468-a405-4bdf-a9d4-f283125368a8	product-images	products/0.20826621875227713.jpeg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-05-25 01:37:45.381488+00	2026-05-25 01:37:45.381488+00	2026-05-25 01:37:45.381488+00	{"eTag": "\\"44cc531c7adc3e43fad630f5ba0bbe81\\"", "size": 49799, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-25T01:37:46.000Z", "contentLength": 49799, "httpStatusCode": 200}	f1f9d5cc-90a9-4d3f-9bf8-86f55705d3d7	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
f8b65876-335f-40e1-988d-217e605e779c	product-images	products/0.35046324557049957.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-06-01 10:23:45.895685+00	2026-06-01 10:23:45.895685+00	2026-06-01 10:23:45.895685+00	{"eTag": "\\"910487ddc5a065c1503e75e609125db0\\"", "size": 4405895, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-01T10:23:46.000Z", "contentLength": 4405895, "httpStatusCode": 200}	33bbc35b-b96c-40e3-82dd-2165d2d10b9b	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
b1343160-5bcd-4626-ac10-4979d2153d46	product-images	products/0.8361657558028652.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-05-25 03:56:17.760257+00	2026-05-25 03:56:17.760257+00	2026-05-25 03:56:17.760257+00	{"eTag": "\\"372fb422989646ebad83e43a65ecb6b0\\"", "size": 3190642, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-25T03:56:18.000Z", "contentLength": 3190642, "httpStatusCode": 200}	bd4dbf7b-91e0-46b7-b0ce-379321ba7302	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
a0fe4b90-4ab8-41cc-a401-6e921819d5be	product-images	products/0.8640480790365249.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-05-25 03:59:54.77184+00	2026-05-25 03:59:54.77184+00	2026-05-25 03:59:54.77184+00	{"eTag": "\\"d06733292ce610943384e45c6cc15067\\"", "size": 3674085, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-25T03:59:55.000Z", "contentLength": 3674085, "httpStatusCode": 200}	c9272fdf-a4cd-441e-a295-7095ec633578	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
f8581402-002a-4417-9284-eea1b7b0b9f4	product-images	products/0.18788735497915598.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-06-01 10:24:47.963138+00	2026-06-01 10:24:47.963138+00	2026-06-01 10:24:47.963138+00	{"eTag": "\\"190bb3d49b0a505df7aeed157b1b57e5\\"", "size": 3201955, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-01T10:24:48.000Z", "contentLength": 3201955, "httpStatusCode": 200}	748ea56b-4743-423f-93f9-991c3cb52527	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
75aea0e3-6cd7-4746-aebd-908fd45f7941	product-images	products/0.5359061331513505.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-05-25 04:03:48.618132+00	2026-05-25 04:03:48.618132+00	2026-05-25 04:03:48.618132+00	{"eTag": "\\"ccf69115a9dde60b7c4247134c47fd59\\"", "size": 3288326, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-25T04:03:49.000Z", "contentLength": 3288326, "httpStatusCode": 200}	8decd2e2-c535-4297-aa2f-318564be4022	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
6903a978-338d-49db-9cce-b6aa1a32fc72	product-images	products/0.08125323362407766.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-05-25 04:04:51.451404+00	2026-05-25 04:04:51.451404+00	2026-05-25 04:04:51.451404+00	{"eTag": "\\"54b48763b3a7dff029ebf83974fe8823\\"", "size": 3388003, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-25T04:04:52.000Z", "contentLength": 3388003, "httpStatusCode": 200}	7e262a38-debc-4370-abee-8e1ac3778d38	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
24a12bca-1d66-4352-9605-ce7a04da7741	product-images	products/0.8411959404940613.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-06-01 10:26:29.995194+00	2026-06-01 10:26:29.995194+00	2026-06-01 10:26:29.995194+00	{"eTag": "\\"8f405b296e79306a1f3f1f98b0027bc1\\"", "size": 3607512, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-01T10:26:30.000Z", "contentLength": 3607512, "httpStatusCode": 200}	05b2a0cb-e756-4745-bef3-cff52833c350	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
d6b62731-69d3-4e55-af27-56269365208b	product-images	products/0.5641897883243947.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-05-25 04:06:03.8652+00	2026-05-25 04:06:03.8652+00	2026-05-25 04:06:03.8652+00	{"eTag": "\\"4e0f9b1fba8eda14f28dfea36deec1d2\\"", "size": 3047030, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-25T04:06:04.000Z", "contentLength": 3047030, "httpStatusCode": 200}	001e0701-7461-4ff0-8022-5ff46d5d61ed	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
fbc55606-af40-4b5e-83cd-ac1a12b4bad4	product-images	products/0.6860120203364194.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-05-25 04:06:31.977086+00	2026-05-25 04:06:31.977086+00	2026-05-25 04:06:31.977086+00	{"eTag": "\\"46b0703eb367e1ea9850004fead95017\\"", "size": 3056563, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-25T04:06:32.000Z", "contentLength": 3056563, "httpStatusCode": 200}	50a5679c-317e-4250-885b-2c77ee47176c	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
99f77f5e-18ea-4f06-b936-cb0bb86e56fa	product-images	products/0.7453936466250433.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-06-01 10:28:20.904723+00	2026-06-01 10:28:20.904723+00	2026-06-01 10:28:20.904723+00	{"eTag": "\\"3b59cb65c4d64a3ba2e27fbf99fd02bd\\"", "size": 4503252, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-01T10:28:21.000Z", "contentLength": 4503252, "httpStatusCode": 200}	c6f172d8-13e7-4886-9eff-fce9066e8ad0	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
7b4e301a-080f-4226-8dc0-cbec713c3700	product-images	products/0.025472027906577432.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-05-25 04:07:50.638302+00	2026-05-25 04:07:50.638302+00	2026-05-25 04:07:50.638302+00	{"eTag": "\\"9c1a4e6c1bfec3a7932cd9e723b587c9\\"", "size": 2570063, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-25T04:07:51.000Z", "contentLength": 2570063, "httpStatusCode": 200}	ada0d377-94ae-4881-948a-b599e07b7fc0	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
57afa056-08f8-46c9-9442-5ab195725694	product-images	products/0.8449568094948632.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-05-25 04:13:48.820042+00	2026-05-25 04:13:48.820042+00	2026-05-25 04:13:48.820042+00	{"eTag": "\\"e107317dc28d1ae27e09d4b0cf861cb4\\"", "size": 3462003, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-25T04:13:49.000Z", "contentLength": 3462003, "httpStatusCode": 200}	4be5e52d-71f0-4f84-a13b-0ba654e0acc0	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
fa9b721f-f734-4df7-80e7-d2a4f8be4a70	product-images	products/0.2778692150627602.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-05-25 04:15:06.806093+00	2026-05-25 04:15:06.806093+00	2026-05-25 04:15:06.806093+00	{"eTag": "\\"efac08abd5b255cde39fda7951ab2a25\\"", "size": 3515509, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-25T04:15:07.000Z", "contentLength": 3515509, "httpStatusCode": 200}	9a89da95-5cc8-4321-81f8-78bbb12a899c	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
ed7488ba-dd06-4ebf-bba8-50f40ac0bf57	product-images	products/0.8605650241815594.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-05-25 04:15:33.862445+00	2026-05-25 04:15:33.862445+00	2026-05-25 04:15:33.862445+00	{"eTag": "\\"01f0970c17ed1e6912a2c1e2a435ebc8\\"", "size": 3064210, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-25T04:15:34.000Z", "contentLength": 3064210, "httpStatusCode": 200}	6a584539-4af4-4fab-aa1b-e634ffdd4e97	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
3f8bdc01-e279-4af5-8fa2-bcae22b5597d	product-images	products/0.4549965816578735.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-06-01 10:31:25.325253+00	2026-06-01 10:31:25.325253+00	2026-06-01 10:31:25.325253+00	{"eTag": "\\"66e32d369452feeec66f1f9dfc49fa52\\"", "size": 3457345, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-01T10:31:26.000Z", "contentLength": 3457345, "httpStatusCode": 200}	374471a8-c4e5-4592-a8ce-acab22c287eb	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
ed7e0c8c-db0c-4b68-8c43-effc1fe68bc9	product-images	products/0.3005327844219856.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-05-25 04:17:36.108711+00	2026-05-25 04:17:36.108711+00	2026-05-25 04:17:36.108711+00	{"eTag": "\\"0ac660a2bf0bef1f5ea3716c40afb467\\"", "size": 3350903, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-25T04:17:37.000Z", "contentLength": 3350903, "httpStatusCode": 200}	ffd33724-2b1d-4477-b921-de4d78f3d929	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
6eeea9cd-192e-469e-a02e-9e3f8c016bc6	product-images	products/0.4461963169313291.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-05-25 04:19:29.782539+00	2026-05-25 04:19:29.782539+00	2026-05-25 04:19:29.782539+00	{"eTag": "\\"aea96454476c2a1716a1a4c289fb1763\\"", "size": 3227257, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-25T04:19:30.000Z", "contentLength": 3227257, "httpStatusCode": 200}	bbedb790-14e0-4eee-9bbb-c111172ca5e2	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
ff00e053-b34b-488b-8024-fce98e00a1df	product-images	products/0.6584884025675908.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-06-01 10:37:29.035488+00	2026-06-01 10:37:29.035488+00	2026-06-01 10:37:29.035488+00	{"eTag": "\\"d5a071a5aa1d05010c61ca16fb0cd5e7\\"", "size": 3378192, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-01T10:37:29.000Z", "contentLength": 3378192, "httpStatusCode": 200}	f864b0e8-1bcc-423d-b215-ebc1902c0b84	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
5645b2fd-7fc4-40cc-b89d-9ea47cbe9175	yamu-assets	articles/articles-1780123013990.png	60a3862d-5846-44ea-bb69-1d8a7323489e	2026-05-30 06:38:51.997951+00	2026-05-30 06:38:51.997951+00	2026-05-30 06:38:51.997951+00	{"eTag": "\\"1a49928e181040d672f0b3f0503914fa\\"", "size": 398634, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-05-30T06:38:52.000Z", "contentLength": 398634, "httpStatusCode": 200}	f896a596-a848-4905-a928-773acf110d6d	60a3862d-5846-44ea-bb69-1d8a7323489e	{}
06240013-de81-4e5d-b632-202d80f0e6c3	yamu-assets	programs/programs-1780123223146.png	60a3862d-5846-44ea-bb69-1d8a7323489e	2026-05-30 06:40:23.814681+00	2026-05-30 06:40:23.814681+00	2026-05-30 06:40:23.814681+00	{"eTag": "\\"1a49928e181040d672f0b3f0503914fa\\"", "size": 398634, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-05-30T06:40:24.000Z", "contentLength": 398634, "httpStatusCode": 200}	d26a10aa-190b-4323-8337-c273d7a9a26a	60a3862d-5846-44ea-bb69-1d8a7323489e	{}
91d8070a-2d28-4fc1-ae66-55775e70de7e	yamu-assets	articles/articles-1780125773334.png	60a3862d-5846-44ea-bb69-1d8a7323489e	2026-05-30 07:22:54.168679+00	2026-05-30 07:22:54.168679+00	2026-05-30 07:22:54.168679+00	{"eTag": "\\"1a49928e181040d672f0b3f0503914fa\\"", "size": 398634, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-05-30T07:22:55.000Z", "contentLength": 398634, "httpStatusCode": 200}	ebf3cf91-24b2-43c0-9e00-8ada2dbbebf6	60a3862d-5846-44ea-bb69-1d8a7323489e	{}
5c147b7a-667d-4045-9204-66ed30fa0356	product-images	products/0.9087476481506808.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-05-30 08:02:20.119836+00	2026-05-30 08:02:20.119836+00	2026-05-30 08:02:20.119836+00	{"eTag": "\\"0bcc21a1b7468097ab4843d584d58032\\"", "size": 3954486, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-30T08:02:21.000Z", "contentLength": 3954486, "httpStatusCode": 200}	e8418b89-00b9-440c-990b-822df891a38a	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
9795090b-a3df-4f42-8254-1dc814f5619f	yamu-assets	programs/1780128203988-Screenshot_2026-05-30_10_03_13.png	60a3862d-5846-44ea-bb69-1d8a7323489e	2026-05-30 08:03:24.833131+00	2026-05-30 08:03:24.833131+00	2026-05-30 08:03:24.833131+00	{"eTag": "\\"1a49928e181040d672f0b3f0503914fa\\"", "size": 398634, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-05-30T08:03:25.000Z", "contentLength": 398634, "httpStatusCode": 200}	a1310db3-f7e5-4008-9fe5-83fb0c83d3d1	60a3862d-5846-44ea-bb69-1d8a7323489e	{}
10de1c99-8ee7-4f1e-919b-392003585397	product-images	products/0.9756301901622288.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-05-30 08:04:16.407143+00	2026-05-30 08:04:16.407143+00	2026-05-30 08:04:16.407143+00	{"eTag": "\\"7ff39806bcb3cc7f986052311783bcdf\\"", "size": 3606164, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-30T08:04:17.000Z", "contentLength": 3606164, "httpStatusCode": 200}	9b81df3d-e16f-4e68-9623-f3c1f323374d	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
f59c1e54-a58e-4656-b5b9-0fc2085a477a	product-images	products/0.059881924804837006.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-05-30 08:07:08.621843+00	2026-05-30 08:07:08.621843+00	2026-05-30 08:07:08.621843+00	{"eTag": "\\"3591130efcfcd0ece10672e717d6d91d\\"", "size": 4057062, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-30T08:07:09.000Z", "contentLength": 4057062, "httpStatusCode": 200}	76b39f2f-5d83-4c2b-afbc-04bc71d779fa	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
5528521b-a77a-4fde-ad1e-c7c1cd52e972	product-images	products/0.030911079997687607.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-05-30 08:08:16.663309+00	2026-05-30 08:08:16.663309+00	2026-05-30 08:08:16.663309+00	{"eTag": "\\"9bc52fbac560e5c986b555301b694d0f\\"", "size": 4669006, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-30T08:08:17.000Z", "contentLength": 4669006, "httpStatusCode": 200}	0c33ed1c-9e2f-4e52-9e3a-7ae3fe6e6d57	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
29aabf38-e12d-436d-9ffb-6163eea151ab	yamu-assets	bimba_articles/1780652328674-Screenshot_2026-06-04_09_31_45.png	60a3862d-5846-44ea-bb69-1d8a7323489e	2026-06-05 09:38:49.268246+00	2026-06-05 09:38:49.268246+00	2026-06-05 09:38:49.268246+00	{"eTag": "\\"7289b0083f150ac03eff1ac0b86caea2\\"", "size": 312420, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-06-05T09:38:50.000Z", "contentLength": 312420, "httpStatusCode": 200}	13a312ef-0435-480c-aff0-585c3c31fb3a	60a3862d-5846-44ea-bb69-1d8a7323489e	{}
d4b56d3b-da2d-4b3c-bbeb-945dc7ddda19	product-images	products/0.3058369952887797.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-05-30 08:09:56.759856+00	2026-05-30 08:09:56.759856+00	2026-05-30 08:09:56.759856+00	{"eTag": "\\"69d2ca2733bbd12d040f7271238aa508\\"", "size": 4366144, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-30T08:09:57.000Z", "contentLength": 4366144, "httpStatusCode": 200}	529717f5-8b35-489d-95e5-c11d425c9aea	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
3bb91997-ade1-4849-baf4-4fdaf9923989	product-images	products/0.9608691129875072.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-05-30 08:13:11.782726+00	2026-05-30 08:13:11.782726+00	2026-05-30 08:13:11.782726+00	{"eTag": "\\"845ffe28553ae565c37235fdf802c37d\\"", "size": 3637944, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-30T08:13:12.000Z", "contentLength": 3637944, "httpStatusCode": 200}	d983aeeb-6057-4e4a-86fb-171581a19d8e	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
5549f382-160b-44cc-a76b-49cdca9a0f0e	product-images	products/0.6201495939820666.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-05-30 08:14:25.26053+00	2026-05-30 08:14:25.26053+00	2026-05-30 08:14:25.26053+00	{"eTag": "\\"1d4318e5753ade98fb4b50db8d5f6c50\\"", "size": 4450156, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-30T08:14:26.000Z", "contentLength": 4450156, "httpStatusCode": 200}	458c7fcc-9f41-4f4d-a14c-09aa8cd70e37	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
4a3159a5-ee9f-45d1-ab67-feee7df323da	product-images	products/0.2086768952922654.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-05-30 08:16:40.909392+00	2026-05-30 08:16:40.909392+00	2026-05-30 08:16:40.909392+00	{"eTag": "\\"331c97e233a982d104d6e114dd96b84b\\"", "size": 3469225, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-30T08:16:41.000Z", "contentLength": 3469225, "httpStatusCode": 200}	e44b43dd-a018-4469-a182-3ef13b2e3415	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
52c31126-abb3-4b62-8df2-c6d4ac1fc02c	product-images	products/0.026012144980463003.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-05-30 08:18:51.253334+00	2026-05-30 08:18:51.253334+00	2026-05-30 08:18:51.253334+00	{"eTag": "\\"83f6c430cb1c636a7228c505663e3d67\\"", "size": 3108447, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-30T08:18:52.000Z", "contentLength": 3108447, "httpStatusCode": 200}	35d378d9-a11d-4ce5-8ca4-91114013e795	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
59042103-50a6-4b13-aecd-cba5c88592d3	product-images	products/0.1771207530133001.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-05-30 08:20:27.996365+00	2026-05-30 08:20:27.996365+00	2026-05-30 08:20:27.996365+00	{"eTag": "\\"dda6163e5632cbf5e687eaa0ba2a0f86\\"", "size": 3586337, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-30T08:20:28.000Z", "contentLength": 3586337, "httpStatusCode": 200}	010aa340-80f6-4ac1-8391-b2228c8d98e7	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
027dd737-4f3a-49ba-937c-d9402920d863	product-images	products/0.9930349882868931.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-05-30 08:23:21.210824+00	2026-05-30 08:23:21.210824+00	2026-05-30 08:23:21.210824+00	{"eTag": "\\"2ecd92c4b0e9178c2dbc74ec85a79b12\\"", "size": 3428233, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-30T08:23:22.000Z", "contentLength": 3428233, "httpStatusCode": 200}	910ff0d4-1c1a-4ea1-ad47-b025c89cef95	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
160d4510-9662-4e5f-836e-564870b682f0	product-images	products/0.6699014441184586.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-05-30 08:25:14.547275+00	2026-05-30 08:25:14.547275+00	2026-05-30 08:25:14.547275+00	{"eTag": "\\"a20bd28467ca085b4e23abfa7f4877e7\\"", "size": 3085984, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-30T08:25:15.000Z", "contentLength": 3085984, "httpStatusCode": 200}	a2dce2bb-68ad-43b8-be86-21a44efb28e4	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
e8739032-849b-450b-841f-c97c0ce75e1d	product-images	products/0.4972386014459511.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-05-30 08:27:10.547053+00	2026-05-30 08:27:10.547053+00	2026-05-30 08:27:10.547053+00	{"eTag": "\\"2239a73709a19f1ac781d8cb9634342e\\"", "size": 3888440, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-30T08:27:11.000Z", "contentLength": 3888440, "httpStatusCode": 200}	0f2345af-b328-4d3f-8ab8-6f09616ed943	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
ee305b36-acf5-4945-a290-9e7984438921	yamu-assets	bimba_articles/1781576524808-ChatGPT Image Jun 13, 2026, 08_34_08 PM.png	60a3862d-5846-44ea-bb69-1d8a7323489e	2026-06-16 02:22:05.380765+00	2026-06-16 02:22:05.380765+00	2026-06-16 02:22:05.380765+00	{"eTag": "\\"17f80bd44093e8691ed1f9aa3e43276a\\"", "size": 1800523, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-06-16T02:22:06.000Z", "contentLength": 1800523, "httpStatusCode": 200}	63309108-4cbf-4f88-9354-4abfaca39d8f	60a3862d-5846-44ea-bb69-1d8a7323489e	{}
7826583a-ec6c-44eb-87cd-0907c4c84e33	product-images	products/0.6746637993410348.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-05-30 08:28:23.080356+00	2026-05-30 08:28:23.080356+00	2026-05-30 08:28:23.080356+00	{"eTag": "\\"66e56d1e73855e1e70ef1c776d53856f\\"", "size": 3399504, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-30T08:28:23.000Z", "contentLength": 3399504, "httpStatusCode": 200}	3a8af5cc-8440-49cd-b305-6472cd95e2cc	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
5fa8b844-4de8-49ce-a95e-5226cb6112c8	yamu-assets	bimba_programs/1781576534177-robot.png	60a3862d-5846-44ea-bb69-1d8a7323489e	2026-06-16 02:22:14.407371+00	2026-06-16 02:22:14.407371+00	2026-06-16 02:22:14.407371+00	{"eTag": "\\"fc1ff56043a53cf361bd9961c4ff17d0\\"", "size": 203334, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-06-16T02:22:15.000Z", "contentLength": 203334, "httpStatusCode": 200}	fe94caf5-c37d-4bbc-90df-71d448de41c4	60a3862d-5846-44ea-bb69-1d8a7323489e	{}
93e0641d-07b0-4f8d-913e-3a662f058127	product-images	products/0.218725983743976.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-05-30 08:30:12.724732+00	2026-05-30 08:30:12.724732+00	2026-05-30 08:30:12.724732+00	{"eTag": "\\"e9bdc570e6e01371aa89267fff65ca90\\"", "size": 3626632, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-30T08:30:13.000Z", "contentLength": 3626632, "httpStatusCode": 200}	566260de-047f-4ba9-bd49-42dafea2e2fe	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
5c4d071e-d2e8-46b8-8bed-8b16ef54f090	yamu-assets	articles/1781579934031-IMG_20260601_120641_682.jpg	60a3862d-5846-44ea-bb69-1d8a7323489e	2026-06-16 03:18:54.828488+00	2026-06-16 03:18:54.828488+00	2026-06-16 03:18:54.828488+00	{"eTag": "\\"18688dc1e9780188687541e2b85ef848\\"", "size": 3968449, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-16T03:18:55.000Z", "contentLength": 3968449, "httpStatusCode": 200}	7fb1ff42-dbc0-4f1c-ad2a-6680ffba9a68	60a3862d-5846-44ea-bb69-1d8a7323489e	{}
35cc4bb0-88c3-4935-8c73-11c4b456c8cb	yamu-assets	programs/1780130555106-Screenshot_2026-05-30_10_03_08.png	60a3862d-5846-44ea-bb69-1d8a7323489e	2026-05-30 08:42:35.790959+00	2026-05-30 08:42:35.790959+00	2026-05-30 08:42:35.790959+00	{"eTag": "\\"7a8b6c1ff987d662ed6e242dbc8baef6\\"", "size": 87867, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-05-30T08:42:36.000Z", "contentLength": 87867, "httpStatusCode": 200}	519239ae-ee11-4f7a-bf30-8e2c52a9247f	60a3862d-5846-44ea-bb69-1d8a7323489e	{}
7ecfced4-883b-4e75-b536-e6799846a79c	yamu-assets	programs/1780130570338-Screenshot_2026-05-30_11_39_11.png	60a3862d-5846-44ea-bb69-1d8a7323489e	2026-05-30 08:42:50.77577+00	2026-05-30 08:42:50.77577+00	2026-05-30 08:42:50.77577+00	{"eTag": "\\"a9fbbde024c0c602c3c1f3f59b553927\\"", "size": 170880, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-05-30T08:42:51.000Z", "contentLength": 170880, "httpStatusCode": 200}	c65e3532-22fb-423e-8a24-be8766cb8e0a	60a3862d-5846-44ea-bb69-1d8a7323489e	{}
a9ae8233-9f85-4514-9348-395dee46a4d3	yamu-assets	programs/1780130640920-Screenshot_2026-05-30_10_03_55.png	60a3862d-5846-44ea-bb69-1d8a7323489e	2026-05-30 08:44:01.435673+00	2026-05-30 08:44:01.435673+00	2026-05-30 08:44:01.435673+00	{"eTag": "\\"5e175f545835c23faf9b2318a6244439\\"", "size": 171293, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-05-30T08:44:02.000Z", "contentLength": 171293, "httpStatusCode": 200}	ce3f85b8-c91d-4934-8261-b958e7ca8501	60a3862d-5846-44ea-bb69-1d8a7323489e	{}
36f1e28f-c28f-4979-9d50-e18be608795f	yamu-assets	programs/1780132685077-Screenshot_2026-05-30_10_03_13.png	60a3862d-5846-44ea-bb69-1d8a7323489e	2026-05-30 09:18:05.658197+00	2026-05-30 09:18:05.658197+00	2026-05-30 09:18:05.658197+00	{"eTag": "\\"1a49928e181040d672f0b3f0503914fa\\"", "size": 398634, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-05-30T09:18:06.000Z", "contentLength": 398634, "httpStatusCode": 200}	1b66bd1c-4cc2-43c8-bd0c-4e1a571d65f9	60a3862d-5846-44ea-bb69-1d8a7323489e	{}
f113d9e5-7928-4cf8-bec8-9a1aef06d92c	yamu-assets	articles/1780132699437-Screenshot_2026-05-30_10_03_08.png	60a3862d-5846-44ea-bb69-1d8a7323489e	2026-05-30 09:18:19.762083+00	2026-05-30 09:18:19.762083+00	2026-05-30 09:18:19.762083+00	{"eTag": "\\"7a8b6c1ff987d662ed6e242dbc8baef6\\"", "size": 87867, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-05-30T09:18:20.000Z", "contentLength": 87867, "httpStatusCode": 200}	374006a7-d4a1-46a8-8f7a-f7a58172c735	60a3862d-5846-44ea-bb69-1d8a7323489e	{}
930243e7-2df4-4763-8597-bc0f95924529	yamu-assets	programs/1780212599436-Screenshot_2-100x70.png	60a3862d-5846-44ea-bb69-1d8a7323489e	2026-05-31 07:30:00.151222+00	2026-05-31 07:30:00.151222+00	2026-05-31 07:30:00.151222+00	{"eTag": "\\"ed541fff535a528e9867bdb81cb05ed3\\"", "size": 17634, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-05-31T07:30:01.000Z", "contentLength": 17634, "httpStatusCode": 200}	8a1a3db6-f500-490a-bd59-28bcfe046d03	60a3862d-5846-44ea-bb69-1d8a7323489e	{}
e2ff9122-a445-4a63-9463-afbb98f6804c	yamu-assets	programs/1780213663016-Screenshot_2-100x70.png	60a3862d-5846-44ea-bb69-1d8a7323489e	2026-05-31 07:47:43.454024+00	2026-05-31 07:47:43.454024+00	2026-05-31 07:47:43.454024+00	{"eTag": "\\"ed541fff535a528e9867bdb81cb05ed3\\"", "size": 17634, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-05-31T07:47:44.000Z", "contentLength": 17634, "httpStatusCode": 200}	3b854545-cec1-4159-9a01-295e1eadaed9	60a3862d-5846-44ea-bb69-1d8a7323489e	{}
bd628a20-64be-4995-a880-5336d3c4f8f2	yamu-assets	articles/1780214413726-Screenshot_2026-05-30_10_03_01.png	60a3862d-5846-44ea-bb69-1d8a7323489e	2026-05-31 08:00:14.206102+00	2026-05-31 08:00:14.206102+00	2026-05-31 08:00:14.206102+00	{"eTag": "\\"e6e98ba23947803761fbe0a3cbaa4b31\\"", "size": 211179, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-05-31T08:00:15.000Z", "contentLength": 211179, "httpStatusCode": 200}	91d4fc8f-b180-4a24-b659-c9692f9fdc57	60a3862d-5846-44ea-bb69-1d8a7323489e	{}
ad0a8767-40ef-4ef1-9483-ce2799405364	yamu-assets	programs/1780216099783-Screenshot_2026-05-31_13_04_18.png	60a3862d-5846-44ea-bb69-1d8a7323489e	2026-05-31 08:28:20.37854+00	2026-05-31 08:28:20.37854+00	2026-05-31 08:28:20.37854+00	{"eTag": "\\"cc2c8b74277770499445d3d5243481e3\\"", "size": 197498, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-05-31T08:28:21.000Z", "contentLength": 197498, "httpStatusCode": 200}	17941fe4-8b55-4135-8dc6-c85184e18b68	60a3862d-5846-44ea-bb69-1d8a7323489e	{}
65cf3570-5281-4eab-99ff-62875c76df1e	yamu-assets	bimba_articles/1782462718739-cover_promosi.png	60a3862d-5846-44ea-bb69-1d8a7323489e	2026-06-26 08:32:00.382047+00	2026-06-26 08:32:00.382047+00	2026-06-26 08:32:00.382047+00	{"eTag": "\\"14bccfff7f7688a2ba97cb2a61a9e381\\"", "size": 7853946, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-06-26T08:32:01.000Z", "contentLength": 7853946, "httpStatusCode": 200}	006ce418-4dda-4870-877e-322c35cb78b3	60a3862d-5846-44ea-bb69-1d8a7323489e	{}
b4732553-ac4d-4842-9fdb-fed24e2bfa0d	product-images	products/0.966378087269898.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-06-01 09:32:27.989593+00	2026-06-01 09:32:27.989593+00	2026-06-01 09:32:27.989593+00	{"eTag": "\\"079e2b6d746991238e53d2a493cb49f9\\"", "size": 3580787, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-01T09:32:28.000Z", "contentLength": 3580787, "httpStatusCode": 200}	b0bb4b6c-5f74-42e7-a449-61ca1cf6bec3	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
da10cef4-d274-4a84-807a-efb08a8faf2b	product-images	products/0.004826588340035465.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-06-01 09:33:47.753968+00	2026-06-01 09:33:47.753968+00	2026-06-01 09:33:47.753968+00	{"eTag": "\\"6044a66e28491a2465c7601f05110083\\"", "size": 3760094, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-01T09:33:48.000Z", "contentLength": 3760094, "httpStatusCode": 200}	fbef5794-66c8-4467-b16b-bb3d1c0b989e	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
19c541e1-2946-4690-ad2c-a34bcd7bd43f	product-images	products/0.9711149999624552.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-06-01 09:37:18.623908+00	2026-06-01 09:37:18.623908+00	2026-06-01 09:37:18.623908+00	{"eTag": "\\"0bf98e5700f259bd2757645cfabf2798\\"", "size": 2884377, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-01T09:37:19.000Z", "contentLength": 2884377, "httpStatusCode": 200}	a2b5e93a-2562-4d0b-9855-3163645fac10	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
6ac80a6d-7100-48c5-8863-e1afc90c2259	product-images	products/0.7720340875791669.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-06-01 09:39:42.959863+00	2026-06-01 09:39:42.959863+00	2026-06-01 09:39:42.959863+00	{"eTag": "\\"7d605357015de79418e80c016106316f\\"", "size": 3816391, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-01T09:39:43.000Z", "contentLength": 3816391, "httpStatusCode": 200}	7beab1c1-02e7-4d05-9117-39eb548db54d	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
19fa7fd6-588a-43f6-b2f5-09b00844ee14	product-images	products/0.8022998574699968.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-06-01 09:41:27.359604+00	2026-06-01 09:41:27.359604+00	2026-06-01 09:41:27.359604+00	{"eTag": "\\"1e7e05d527983adac7dfe0fe79a4fce5\\"", "size": 3421729, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-01T09:41:28.000Z", "contentLength": 3421729, "httpStatusCode": 200}	c962a165-011a-4680-9cb1-3cdf6d2965c8	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
b561b70d-769a-427b-a303-0420dbd04bf0	product-images	products/0.7197901832484502.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-06-01 09:44:27.360018+00	2026-06-01 09:44:27.360018+00	2026-06-01 09:44:27.360018+00	{"eTag": "\\"303caf373e77c5d77adc05f6c5f8a0dd\\"", "size": 2655148, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-01T09:44:28.000Z", "contentLength": 2655148, "httpStatusCode": 200}	75a19878-93a8-49b4-a2e7-c5fb3e3342e4	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
0e0d2355-5d32-4bdb-ae83-1c06d98583b8	product-images	products/0.8790201665419471.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-06-01 09:45:32.968514+00	2026-06-01 09:45:32.968514+00	2026-06-01 09:45:32.968514+00	{"eTag": "\\"f5a3b87004262448ef3f85f3955106d1\\"", "size": 3206368, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-01T09:45:33.000Z", "contentLength": 3206368, "httpStatusCode": 200}	422db270-a832-4cf5-a672-98bed0350ce1	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
855c0b3a-bb8b-445e-9815-e05ee895d2b8	product-images	products/0.1268079310232677.jpg	ef8d126a-75ab-4041-a99a-b34d1b172590	2026-06-01 09:45:36.510982+00	2026-06-01 09:45:36.510982+00	2026-06-01 09:45:36.510982+00	{"eTag": "\\"f5a3b87004262448ef3f85f3955106d1\\"", "size": 3206368, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-01T09:45:37.000Z", "contentLength": 3206368, "httpStatusCode": 200}	4e83ad75-ee5c-4f4a-a624-b6b1f25eb655	ef8d126a-75ab-4041-a99a-b34d1b172590	{}
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads (id, in_progress_size, upload_signature, bucket_id, key, version, owner_id, created_at, user_metadata, metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads_parts (id, upload_id, size, part_number, bucket_id, key, etag, owner_id, version, created_at) FROM stdin;
\.


--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.vector_indexes (id, name, bucket_id, data_type, dimension, distance_metric, metadata_configuration, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: supabase_migrations; Owner: postgres
--

COPY supabase_migrations.schema_migrations (version, statements, name) FROM stdin;
20260310142430	\N	setup_storage
20260310142637	\N	create_bucket
20260310143832	{"-- 1. Izin untuk Tabel Products (Jika belum sukses tadi)\nALTER TABLE public.products ENABLE ROW LEVEL SECURITY","DROP POLICY IF EXISTS \\"Allow all products\\" ON public.products","CREATE POLICY \\"Allow all products\\" ON public.products FOR ALL TO anon USING (true) WITH CHECK (true)","-- 2. Izin untuk Storage (Langsung ke Policy, tanpa ALTER TABLE)\n-- Kita pakai nama policy baru agar tidak bentrok\nDROP POLICY IF EXISTS \\"Allow anon all storage\\" ON storage.objects","CREATE POLICY \\"Allow anon all storage\\" ON storage.objects \nFOR ALL TO anon \nUSING (bucket_id = 'product-images') \nWITH CHECK (bucket_id = 'product-images')"}	fix_rls_final
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 97, true);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: supabase_realtime_admin
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1670, true);


--
-- Name: mfa_amr_claims amr_id_pk; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT amr_id_pk PRIMARY KEY (id);


--
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.audit_log_entries
    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);


--
-- Name: custom_oauth_providers custom_oauth_providers_identifier_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.custom_oauth_providers
    ADD CONSTRAINT custom_oauth_providers_identifier_key UNIQUE (identifier);


--
-- Name: custom_oauth_providers custom_oauth_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.custom_oauth_providers
    ADD CONSTRAINT custom_oauth_providers_pkey PRIMARY KEY (id);


--
-- Name: flow_state flow_state_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.flow_state
    ADD CONSTRAINT flow_state_pkey PRIMARY KEY (id);


--
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);


--
-- Name: identities identities_provider_id_provider_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_provider_id_provider_unique UNIQUE (provider_id, provider);


--
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_authentication_method_pkey UNIQUE (session_id, authentication_method);


--
-- Name: mfa_challenges mfa_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_pkey PRIMARY KEY (id);


--
-- Name: mfa_factors mfa_factors_last_challenged_at_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_last_challenged_at_key UNIQUE (last_challenged_at);


--
-- Name: mfa_factors mfa_factors_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_pkey PRIMARY KEY (id);


--
-- Name: oauth_authorizations oauth_authorizations_authorization_code_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_authorization_code_key UNIQUE (authorization_code);


--
-- Name: oauth_authorizations oauth_authorizations_authorization_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_authorization_id_key UNIQUE (authorization_id);


--
-- Name: oauth_authorizations oauth_authorizations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_pkey PRIMARY KEY (id);


--
-- Name: oauth_client_states oauth_client_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_client_states
    ADD CONSTRAINT oauth_client_states_pkey PRIMARY KEY (id);


--
-- Name: oauth_clients oauth_clients_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_clients
    ADD CONSTRAINT oauth_clients_pkey PRIMARY KEY (id);


--
-- Name: oauth_consents oauth_consents_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_pkey PRIMARY KEY (id);


--
-- Name: oauth_consents oauth_consents_user_client_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_user_client_unique UNIQUE (user_id, client_id);


--
-- Name: one_time_tokens one_time_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_token_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_unique UNIQUE (token);


--
-- Name: saml_providers saml_providers_entity_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_entity_id_key UNIQUE (entity_id);


--
-- Name: saml_providers saml_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_pkey PRIMARY KEY (id);


--
-- Name: saml_relay_states saml_relay_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sso_domains sso_domains_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_pkey PRIMARY KEY (id);


--
-- Name: sso_providers sso_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_providers
    ADD CONSTRAINT sso_providers_pkey PRIMARY KEY (id);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: webauthn_challenges webauthn_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.webauthn_challenges
    ADD CONSTRAINT webauthn_challenges_pkey PRIMARY KEY (id);


--
-- Name: webauthn_credentials webauthn_credentials_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.webauthn_credentials
    ADD CONSTRAINT webauthn_credentials_pkey PRIMARY KEY (id);


--
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id);


--
-- Name: bank_accounts bank_accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bank_accounts
    ADD CONSTRAINT bank_accounts_pkey PRIMARY KEY (id);


--
-- Name: bimba_articles bimba_articles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bimba_articles
    ADD CONSTRAINT bimba_articles_pkey PRIMARY KEY (id);


--
-- Name: donations donations_order_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.donations
    ADD CONSTRAINT donations_order_id_key UNIQUE (order_id);


--
-- Name: donations donations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.donations
    ADD CONSTRAINT donations_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: programs programs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.programs
    ADD CONSTRAINT programs_pkey PRIMARY KEY (id);


--
-- Name: qurban_orders qurban_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.qurban_orders
    ADD CONSTRAINT qurban_orders_pkey PRIMARY KEY (id);


--
-- Name: qurban_settings qurban_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.qurban_settings
    ADD CONSTRAINT qurban_settings_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE ONLY realtime.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2026_05_30 messages_2026_05_30_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2026_05_30
    ADD CONSTRAINT messages_2026_05_30_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2026_05_31 messages_2026_05_31_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2026_05_31
    ADD CONSTRAINT messages_2026_05_31_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2026_06_01 messages_2026_06_01_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2026_06_01
    ADD CONSTRAINT messages_2026_06_01_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2026_06_02 messages_2026_06_02_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2026_06_02
    ADD CONSTRAINT messages_2026_06_02_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2026_06_03 messages_2026_06_03_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2026_06_03
    ADD CONSTRAINT messages_2026_06_03_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2026_06_04 messages_2026_06_04_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2026_06_04
    ADD CONSTRAINT messages_2026_06_04_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2026_06_05 messages_2026_06_05_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2026_06_05
    ADD CONSTRAINT messages_2026_06_05_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages messages_payload_exclusive; Type: CHECK CONSTRAINT; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE realtime.messages
    ADD CONSTRAINT messages_payload_exclusive CHECK (((payload IS NULL) OR (binary_payload IS NULL))) NOT VALID;


--
-- Name: subscription pk_subscription; Type: CONSTRAINT; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE ONLY realtime.subscription
    ADD CONSTRAINT pk_subscription PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: buckets_analytics buckets_analytics_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets_analytics
    ADD CONSTRAINT buckets_analytics_pkey PRIMARY KEY (id);


--
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);


--
-- Name: buckets_vectors buckets_vectors_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets_vectors
    ADD CONSTRAINT buckets_vectors_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_pkey PRIMARY KEY (id);


--
-- Name: vector_indexes vector_indexes_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.vector_indexes
    ADD CONSTRAINT vector_indexes_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: supabase_migrations; Owner: postgres
--

ALTER TABLE ONLY supabase_migrations.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id);


--
-- Name: confirmation_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX confirmation_token_idx ON auth.users USING btree (confirmation_token) WHERE ((confirmation_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: custom_oauth_providers_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX custom_oauth_providers_created_at_idx ON auth.custom_oauth_providers USING btree (created_at);


--
-- Name: custom_oauth_providers_enabled_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX custom_oauth_providers_enabled_idx ON auth.custom_oauth_providers USING btree (enabled);


--
-- Name: custom_oauth_providers_identifier_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX custom_oauth_providers_identifier_idx ON auth.custom_oauth_providers USING btree (identifier);


--
-- Name: custom_oauth_providers_provider_type_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX custom_oauth_providers_provider_type_idx ON auth.custom_oauth_providers USING btree (provider_type);


--
-- Name: email_change_token_current_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_current_idx ON auth.users USING btree (email_change_token_current) WHERE ((email_change_token_current)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_new_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_new_idx ON auth.users USING btree (email_change_token_new) WHERE ((email_change_token_new)::text !~ '^[0-9 ]*$'::text);


--
-- Name: factor_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX factor_id_created_at_idx ON auth.mfa_factors USING btree (user_id, created_at);


--
-- Name: flow_state_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX flow_state_created_at_idx ON auth.flow_state USING btree (created_at DESC);


--
-- Name: identities_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_email_idx ON auth.identities USING btree (email text_pattern_ops);


--
-- Name: INDEX identities_email_idx; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.identities_email_idx IS 'Auth: Ensures indexed queries on the email column';


--
-- Name: identities_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_user_id_idx ON auth.identities USING btree (user_id);


--
-- Name: idx_auth_code; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);


--
-- Name: idx_oauth_client_states_created_at; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_oauth_client_states_created_at ON auth.oauth_client_states USING btree (created_at);


--
-- Name: idx_user_id_auth_method; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_user_id_auth_method ON auth.flow_state USING btree (user_id, authentication_method);


--
-- Name: mfa_challenge_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_challenge_created_at_idx ON auth.mfa_challenges USING btree (created_at DESC);


--
-- Name: mfa_factors_user_friendly_name_unique; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX mfa_factors_user_friendly_name_unique ON auth.mfa_factors USING btree (friendly_name, user_id) WHERE (TRIM(BOTH FROM friendly_name) <> ''::text);


--
-- Name: mfa_factors_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_factors_user_id_idx ON auth.mfa_factors USING btree (user_id);


--
-- Name: oauth_auth_pending_exp_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_auth_pending_exp_idx ON auth.oauth_authorizations USING btree (expires_at) WHERE (status = 'pending'::auth.oauth_authorization_status);


--
-- Name: oauth_clients_deleted_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_clients_deleted_at_idx ON auth.oauth_clients USING btree (deleted_at);


--
-- Name: oauth_consents_active_client_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_active_client_idx ON auth.oauth_consents USING btree (client_id) WHERE (revoked_at IS NULL);


--
-- Name: oauth_consents_active_user_client_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_active_user_client_idx ON auth.oauth_consents USING btree (user_id, client_id) WHERE (revoked_at IS NULL);


--
-- Name: oauth_consents_user_order_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_user_order_idx ON auth.oauth_consents USING btree (user_id, granted_at DESC);


--
-- Name: one_time_tokens_relates_to_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_relates_to_hash_idx ON auth.one_time_tokens USING hash (relates_to);


--
-- Name: one_time_tokens_token_hash_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_token_hash_hash_idx ON auth.one_time_tokens USING hash (token_hash);


--
-- Name: one_time_tokens_user_id_token_type_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON auth.one_time_tokens USING btree (user_id, token_type);


--
-- Name: reauthentication_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX reauthentication_token_idx ON auth.users USING btree (reauthentication_token) WHERE ((reauthentication_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: recovery_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX recovery_token_idx ON auth.users USING btree (recovery_token) WHERE ((recovery_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id);


--
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id);


--
-- Name: refresh_tokens_parent_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_parent_idx ON auth.refresh_tokens USING btree (parent);


--
-- Name: refresh_tokens_session_id_revoked_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_session_id_revoked_idx ON auth.refresh_tokens USING btree (session_id, revoked);


--
-- Name: refresh_tokens_updated_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_updated_at_idx ON auth.refresh_tokens USING btree (updated_at DESC);


--
-- Name: saml_providers_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_providers_sso_provider_id_idx ON auth.saml_providers USING btree (sso_provider_id);


--
-- Name: saml_relay_states_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_created_at_idx ON auth.saml_relay_states USING btree (created_at DESC);


--
-- Name: saml_relay_states_for_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_for_email_idx ON auth.saml_relay_states USING btree (for_email);


--
-- Name: saml_relay_states_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_sso_provider_id_idx ON auth.saml_relay_states USING btree (sso_provider_id);


--
-- Name: sessions_not_after_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_not_after_idx ON auth.sessions USING btree (not_after DESC);


--
-- Name: sessions_oauth_client_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_oauth_client_id_idx ON auth.sessions USING btree (oauth_client_id);


--
-- Name: sessions_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_user_id_idx ON auth.sessions USING btree (user_id);


--
-- Name: sso_domains_domain_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_domains_domain_idx ON auth.sso_domains USING btree (lower(domain));


--
-- Name: sso_domains_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_domains_sso_provider_id_idx ON auth.sso_domains USING btree (sso_provider_id);


--
-- Name: sso_providers_resource_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_providers_resource_id_idx ON auth.sso_providers USING btree (lower(resource_id));


--
-- Name: sso_providers_resource_id_pattern_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_providers_resource_id_pattern_idx ON auth.sso_providers USING btree (resource_id text_pattern_ops);


--
-- Name: unique_phone_factor_per_user; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX unique_phone_factor_per_user ON auth.mfa_factors USING btree (user_id, phone);


--
-- Name: user_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX user_id_created_at_idx ON auth.sessions USING btree (user_id, created_at);


--
-- Name: users_email_partial_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX users_email_partial_key ON auth.users USING btree (email) WHERE (is_sso_user = false);


--
-- Name: INDEX users_email_partial_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.users_email_partial_key IS 'Auth: A partial unique index that applies only when is_sso_user is false';


--
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, lower((email)::text));


--
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id);


--
-- Name: users_is_anonymous_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_is_anonymous_idx ON auth.users USING btree (is_anonymous);


--
-- Name: webauthn_challenges_expires_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX webauthn_challenges_expires_at_idx ON auth.webauthn_challenges USING btree (expires_at);


--
-- Name: webauthn_challenges_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX webauthn_challenges_user_id_idx ON auth.webauthn_challenges USING btree (user_id);


--
-- Name: webauthn_credentials_credential_id_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX webauthn_credentials_credential_id_key ON auth.webauthn_credentials USING btree (credential_id);


--
-- Name: webauthn_credentials_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX webauthn_credentials_user_id_idx ON auth.webauthn_credentials USING btree (user_id);


--
-- Name: ix_realtime_subscription_entity; Type: INDEX; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE INDEX ix_realtime_subscription_entity ON realtime.subscription USING btree (entity);


--
-- Name: messages_inserted_at_topic_index; Type: INDEX; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE INDEX messages_inserted_at_topic_index ON ONLY realtime.messages USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: messages_2026_05_30_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2026_05_30_inserted_at_topic_idx ON realtime.messages_2026_05_30 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: messages_2026_05_31_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2026_05_31_inserted_at_topic_idx ON realtime.messages_2026_05_31 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: messages_2026_06_01_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2026_06_01_inserted_at_topic_idx ON realtime.messages_2026_06_01 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: messages_2026_06_02_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2026_06_02_inserted_at_topic_idx ON realtime.messages_2026_06_02 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: messages_2026_06_03_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2026_06_03_inserted_at_topic_idx ON realtime.messages_2026_06_03 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: messages_2026_06_04_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2026_06_04_inserted_at_topic_idx ON realtime.messages_2026_06_04 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: messages_2026_06_05_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2026_06_05_inserted_at_topic_idx ON realtime.messages_2026_06_05 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: subscription_subscription_id_entity_filters_action_filter_selec; Type: INDEX; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE UNIQUE INDEX subscription_subscription_id_entity_filters_action_filter_selec ON realtime.subscription USING btree (subscription_id, entity, filters, action_filter, COALESCE(selected_columns, '{}'::text[]));


--
-- Name: bname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);


--
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);


--
-- Name: buckets_analytics_unique_name_idx; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX buckets_analytics_unique_name_idx ON storage.buckets_analytics USING btree (name) WHERE (deleted_at IS NULL);


--
-- Name: idx_multipart_uploads_list; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_multipart_uploads_list ON storage.s3_multipart_uploads USING btree (bucket_id, key, created_at);


--
-- Name: idx_objects_bucket_id_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_bucket_id_name ON storage.objects USING btree (bucket_id, name COLLATE "C");


--
-- Name: idx_objects_bucket_id_name_lower; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_bucket_id_name_lower ON storage.objects USING btree (bucket_id, lower(name) COLLATE "C");


--
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);


--
-- Name: vector_indexes_name_bucket_id_idx; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX vector_indexes_name_bucket_id_idx ON storage.vector_indexes USING btree (name, bucket_id);


--
-- Name: messages_2026_05_30_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2026_05_30_inserted_at_topic_idx;


--
-- Name: messages_2026_05_30_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2026_05_30_pkey;


--
-- Name: messages_2026_05_31_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2026_05_31_inserted_at_topic_idx;


--
-- Name: messages_2026_05_31_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2026_05_31_pkey;


--
-- Name: messages_2026_06_01_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2026_06_01_inserted_at_topic_idx;


--
-- Name: messages_2026_06_01_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2026_06_01_pkey;


--
-- Name: messages_2026_06_02_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2026_06_02_inserted_at_topic_idx;


--
-- Name: messages_2026_06_02_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2026_06_02_pkey;


--
-- Name: messages_2026_06_03_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2026_06_03_inserted_at_topic_idx;


--
-- Name: messages_2026_06_03_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2026_06_03_pkey;


--
-- Name: messages_2026_06_04_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2026_06_04_inserted_at_topic_idx;


--
-- Name: messages_2026_06_04_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2026_06_04_pkey;


--
-- Name: messages_2026_06_05_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2026_06_05_inserted_at_topic_idx;


--
-- Name: messages_2026_06_05_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2026_06_05_pkey;


--
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TRIGGER tr_check_filters BEFORE INSERT OR UPDATE ON realtime.subscription FOR EACH ROW EXECUTE FUNCTION realtime.subscription_check_filters();


--
-- Name: buckets enforce_bucket_name_length_trigger; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER enforce_bucket_name_length_trigger BEFORE INSERT OR UPDATE OF name ON storage.buckets FOR EACH ROW EXECUTE FUNCTION storage.enforce_bucket_name_length();


--
-- Name: buckets protect_buckets_delete; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER protect_buckets_delete BEFORE DELETE ON storage.buckets FOR EACH STATEMENT EXECUTE FUNCTION storage.protect_delete();


--
-- Name: objects protect_objects_delete; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER protect_objects_delete BEFORE DELETE ON storage.objects FOR EACH STATEMENT EXECUTE FUNCTION storage.protect_delete();


--
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();


--
-- Name: identities identities_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: mfa_challenges mfa_challenges_auth_factor_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_auth_factor_id_fkey FOREIGN KEY (factor_id) REFERENCES auth.mfa_factors(id) ON DELETE CASCADE;


--
-- Name: mfa_factors mfa_factors_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: oauth_authorizations oauth_authorizations_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: oauth_authorizations oauth_authorizations_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: oauth_consents oauth_consents_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: oauth_consents oauth_consents_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: one_time_tokens one_time_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: saml_providers saml_providers_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_flow_state_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_flow_state_id_fkey FOREIGN KEY (flow_state_id) REFERENCES auth.flow_state(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_oauth_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_oauth_client_id_fkey FOREIGN KEY (oauth_client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: sso_domains sso_domains_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: webauthn_challenges webauthn_challenges_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.webauthn_challenges
    ADD CONSTRAINT webauthn_challenges_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: webauthn_credentials webauthn_credentials_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.webauthn_credentials
    ADD CONSTRAINT webauthn_credentials_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_upload_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_upload_id_fkey FOREIGN KEY (upload_id) REFERENCES storage.s3_multipart_uploads(id) ON DELETE CASCADE;


--
-- Name: vector_indexes vector_indexes_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.vector_indexes
    ADD CONSTRAINT vector_indexes_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets_vectors(id);


--
-- Name: audit_log_entries; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.audit_log_entries ENABLE ROW LEVEL SECURITY;

--
-- Name: flow_state; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.flow_state ENABLE ROW LEVEL SECURITY;

--
-- Name: identities; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.identities ENABLE ROW LEVEL SECURITY;

--
-- Name: instances; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.instances ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_amr_claims; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_amr_claims ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_challenges; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_challenges ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_factors; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_factors ENABLE ROW LEVEL SECURITY;

--
-- Name: one_time_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.one_time_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: refresh_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_relay_states; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_relay_states ENABLE ROW LEVEL SECURITY;

--
-- Name: schema_migrations; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.schema_migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: sessions; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_domains; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_domains ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

--
-- Name: qurban_orders Allow admin manage orders; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow admin manage orders" ON public.qurban_orders TO authenticated USING (true) WITH CHECK (true);


--
-- Name: qurban_settings Allow admin manage settings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow admin manage settings" ON public.qurban_settings TO authenticated USING (true) WITH CHECK (true);


--
-- Name: articles Allow authenticated delete on articles; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated delete on articles" ON public.articles FOR DELETE USING ((auth.role() = 'authenticated'::text));


--
-- Name: donations Allow authenticated delete on donations; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated delete on donations" ON public.donations FOR DELETE USING ((auth.role() = 'authenticated'::text));


--
-- Name: programs Allow authenticated delete on programs; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated delete on programs" ON public.programs FOR DELETE USING ((auth.role() = 'authenticated'::text));


--
-- Name: articles Allow authenticated insert on articles; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated insert on articles" ON public.articles FOR INSERT WITH CHECK ((auth.role() = 'authenticated'::text));


--
-- Name: programs Allow authenticated insert on programs; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated insert on programs" ON public.programs FOR INSERT WITH CHECK ((auth.role() = 'authenticated'::text));


--
-- Name: bank_accounts Allow authenticated manage bank; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated manage bank" ON public.bank_accounts USING ((auth.role() = 'authenticated'::text));


--
-- Name: messages Allow authenticated read messages; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated read messages" ON public.messages FOR SELECT USING ((auth.role() = 'authenticated'::text));


--
-- Name: articles Allow authenticated update on articles; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated update on articles" ON public.articles FOR UPDATE USING ((auth.role() = 'authenticated'::text));


--
-- Name: donations Allow authenticated update on donations; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated update on donations" ON public.donations FOR UPDATE USING ((auth.role() = 'authenticated'::text));


--
-- Name: programs Allow authenticated update on programs; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated update on programs" ON public.programs FOR UPDATE USING ((auth.role() = 'authenticated'::text));


--
-- Name: messages Allow public insert messages; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow public insert messages" ON public.messages FOR INSERT WITH CHECK (true);


--
-- Name: donations Allow public insert on donations; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow public insert on donations" ON public.donations FOR INSERT WITH CHECK (true);


--
-- Name: qurban_orders Allow public insert orders; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow public insert orders" ON public.qurban_orders FOR INSERT WITH CHECK (true);


--
-- Name: qurban_settings Allow public read access; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow public read access" ON public.qurban_settings FOR SELECT USING (true);


--
-- Name: articles Allow public read access on articles; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow public read access on articles" ON public.articles FOR SELECT USING (true);


--
-- Name: donations Allow public read access on donations; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow public read access on donations" ON public.donations FOR SELECT USING (true);


--
-- Name: programs Allow public read access on programs; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow public read access on programs" ON public.programs FOR SELECT USING (true);


--
-- Name: bank_accounts Allow public read bank; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow public read bank" ON public.bank_accounts FOR SELECT USING (true);


--
-- Name: donations Allow public update amin_count; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow public update amin_count" ON public.donations FOR UPDATE USING (true) WITH CHECK (true);


--
-- Name: articles; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

--
-- Name: bank_accounts; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.bank_accounts ENABLE ROW LEVEL SECURITY;

--
-- Name: bimba_articles; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.bimba_articles ENABLE ROW LEVEL SECURITY;

--
-- Name: donations; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

--
-- Name: messages; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

--
-- Name: programs; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;

--
-- Name: qurban_orders; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.qurban_orders ENABLE ROW LEVEL SECURITY;

--
-- Name: qurban_settings; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.qurban_settings ENABLE ROW LEVEL SECURITY;

--
-- Name: messages; Type: ROW SECURITY; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

--
-- Name: objects Allow Public Upload 16wiy3a_0; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Allow Public Upload 16wiy3a_0" ON storage.objects FOR INSERT TO authenticated, anon WITH CHECK ((auth.role() = 'authenticated'::text));


--
-- Name: objects Allow anon all storage; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Allow anon all storage" ON storage.objects TO anon USING ((bucket_id = 'product-images'::text)) WITH CHECK ((bucket_id = 'product-images'::text));


--
-- Name: objects Allow anon select; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Allow anon select" ON storage.objects FOR SELECT TO anon USING ((bucket_id = 'payment-proofs'::text));


--
-- Name: objects Allow anon uploads; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Allow anon uploads" ON storage.objects FOR INSERT TO anon WITH CHECK ((bucket_id = 'payment-proofs'::text));


--
-- Name: objects Give anon users access to JPG images in folder 16wiy3a_0; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Give anon users access to JPG images in folder 16wiy3a_0" ON storage.objects FOR INSERT TO anon WITH CHECK (((bucket_id = 'product-images'::text) AND (storage.extension(name) = 'jpg'::text) AND (lower((storage.foldername(name))[1]) = 'public'::text) AND (auth.role() = 'anon'::text)));


--
-- Name: objects Give anon users access to JPG images in folder w1pnpy_0; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Give anon users access to JPG images in folder w1pnpy_0" ON storage.objects FOR SELECT TO anon USING (((bucket_id = 'payment-proofs'::text) AND (storage.extension(name) = 'jpg'::text) AND (lower((storage.foldername(name))[1]) = 'public'::text) AND (auth.role() = 'anon'::text)));


--
-- Name: objects Give anon users access to JPG images in folder w1pnpy_1; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Give anon users access to JPG images in folder w1pnpy_1" ON storage.objects FOR INSERT TO anon WITH CHECK (((bucket_id = 'payment-proofs'::text) AND (storage.extension(name) = 'jpg'::text) AND (lower((storage.foldername(name))[1]) = 'public'::text) AND (auth.role() = 'anon'::text)));


--
-- Name: objects Public Upload to Payment Proofs; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Public Upload to Payment Proofs" ON storage.objects FOR INSERT WITH CHECK ((bucket_id = 'payment-proofs'::text));


--
-- Name: objects Public View Payment Proofs; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Public View Payment Proofs" ON storage.objects FOR SELECT USING ((bucket_id = 'payment-proofs'::text));


--
-- Name: buckets; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets_analytics; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets_analytics ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets_vectors; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets_vectors ENABLE ROW LEVEL SECURITY;

--
-- Name: migrations; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads_parts; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads_parts ENABLE ROW LEVEL SECURITY;

--
-- Name: vector_indexes; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.vector_indexes ENABLE ROW LEVEL SECURITY;

--
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: postgres
--

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime OWNER TO postgres;

--
-- Name: supabase_realtime_messages_publication; Type: PUBLICATION; Schema: -; Owner: supabase_admin
--

CREATE PUBLICATION supabase_realtime_messages_publication WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime_messages_publication OWNER TO supabase_admin;

--
-- Name: supabase_realtime_messages_publication messages; Type: PUBLICATION TABLE; Schema: realtime; Owner: supabase_admin
--

ALTER PUBLICATION supabase_realtime_messages_publication ADD TABLE ONLY realtime.messages;


--
-- Name: SCHEMA auth; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA auth TO anon;
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT USAGE ON SCHEMA auth TO service_role;
GRANT ALL ON SCHEMA auth TO supabase_auth_admin;
GRANT ALL ON SCHEMA auth TO dashboard_user;
GRANT USAGE ON SCHEMA auth TO postgres;


--
-- Name: SCHEMA extensions; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA extensions TO anon;
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT USAGE ON SCHEMA extensions TO service_role;
GRANT ALL ON SCHEMA extensions TO dashboard_user;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- Name: SCHEMA realtime; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA realtime TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA realtime TO anon;
GRANT USAGE ON SCHEMA realtime TO authenticated;
GRANT USAGE ON SCHEMA realtime TO service_role;
GRANT ALL ON SCHEMA realtime TO supabase_realtime_admin;


--
-- Name: SCHEMA storage; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA storage TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA storage TO anon;
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT USAGE ON SCHEMA storage TO service_role;
GRANT ALL ON SCHEMA storage TO supabase_storage_admin WITH GRANT OPTION;
GRANT ALL ON SCHEMA storage TO dashboard_user;


--
-- Name: SCHEMA vault; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA vault TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA vault TO service_role;


--
-- Name: FUNCTION email(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.email() TO dashboard_user;


--
-- Name: FUNCTION jwt(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.jwt() TO postgres;
GRANT ALL ON FUNCTION auth.jwt() TO dashboard_user;


--
-- Name: FUNCTION role(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.role() TO dashboard_user;


--
-- Name: FUNCTION uid(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.uid() TO dashboard_user;


--
-- Name: FUNCTION armor(bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.armor(bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO dashboard_user;


--
-- Name: FUNCTION armor(bytea, text[], text[]); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.armor(bytea, text[], text[]) FROM postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO dashboard_user;


--
-- Name: FUNCTION crypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.crypt(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION dearmor(text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.dearmor(text) FROM postgres;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO dashboard_user;


--
-- Name: FUNCTION decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION decrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.digest(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.digest(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION gen_random_bytes(integer); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_random_bytes(integer) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO dashboard_user;


--
-- Name: FUNCTION gen_random_uuid(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_random_uuid() FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_salt(text) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text, integer); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_salt(text, integer) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO dashboard_user;


--
-- Name: FUNCTION grant_pg_cron_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_cron_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO dashboard_user;


--
-- Name: FUNCTION grant_pg_graphql_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.grant_pg_graphql_access() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION grant_pg_net_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_net_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO dashboard_user;


--
-- Name: FUNCTION hmac(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.hmac(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION hmac(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.hmac(text, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) TO dashboard_user;


--
-- Name: FUNCTION pgp_armor_headers(text, OUT key text, OUT value text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO dashboard_user;


--
-- Name: FUNCTION pgp_key_id(bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_key_id(bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgrst_ddl_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_ddl_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgrst_drop_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_drop_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION set_graphql_placeholder(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.set_graphql_placeholder() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_generate_v1(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v1() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v1mc(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v1mc() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v3(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v4(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v4() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v5(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_nil(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_nil() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_dns(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_dns() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_oid(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_oid() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_url(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_url() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_x500(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_x500() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO dashboard_user;


--
-- Name: FUNCTION graphql("operationName" text, query text, variables jsonb, extensions jsonb); Type: ACL; Schema: graphql_public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO postgres;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO anon;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO authenticated;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO service_role;


--
-- Name: FUNCTION pg_reload_conf(); Type: ACL; Schema: pg_catalog; Owner: supabase_admin
--

GRANT ALL ON FUNCTION pg_catalog.pg_reload_conf() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION get_auth(p_usename text); Type: ACL; Schema: pgbouncer; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION pgbouncer.get_auth(p_usename text) FROM PUBLIC;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO pgbouncer;


--
-- Name: FUNCTION calculate_monthly_revenue_v2(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.calculate_monthly_revenue_v2() TO anon;
GRANT ALL ON FUNCTION public.calculate_monthly_revenue_v2() TO authenticated;
GRANT ALL ON FUNCTION public.calculate_monthly_revenue_v2() TO service_role;


--
-- Name: FUNCTION calculate_real_monthly_revenue(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.calculate_real_monthly_revenue() TO anon;
GRANT ALL ON FUNCTION public.calculate_real_monthly_revenue() TO authenticated;
GRANT ALL ON FUNCTION public.calculate_real_monthly_revenue() TO service_role;


--
-- Name: FUNCTION calculate_real_monthly_revenue_v2(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.calculate_real_monthly_revenue_v2() TO anon;
GRANT ALL ON FUNCTION public.calculate_real_monthly_revenue_v2() TO authenticated;
GRANT ALL ON FUNCTION public.calculate_real_monthly_revenue_v2() TO service_role;


--
-- Name: FUNCTION increment_program_donation(target_program_id uuid, donation_amount bigint); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.increment_program_donation(target_program_id uuid, donation_amount bigint) TO anon;
GRANT ALL ON FUNCTION public.increment_program_donation(target_program_id uuid, donation_amount bigint) TO authenticated;
GRANT ALL ON FUNCTION public.increment_program_donation(target_program_id uuid, donation_amount bigint) TO service_role;


--
-- Name: FUNCTION rls_auto_enable(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.rls_auto_enable() TO anon;
GRANT ALL ON FUNCTION public.rls_auto_enable() TO authenticated;
GRANT ALL ON FUNCTION public.rls_auto_enable() TO service_role;


--
-- Name: FUNCTION update_monthly_revenue_trigger(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.update_monthly_revenue_trigger() TO anon;
GRANT ALL ON FUNCTION public.update_monthly_revenue_trigger() TO authenticated;
GRANT ALL ON FUNCTION public.update_monthly_revenue_trigger() TO service_role;


--
-- Name: FUNCTION update_monthly_revenue_trigger_v2(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.update_monthly_revenue_trigger_v2() TO anon;
GRANT ALL ON FUNCTION public.update_monthly_revenue_trigger_v2() TO authenticated;
GRANT ALL ON FUNCTION public.update_monthly_revenue_trigger_v2() TO service_role;


--
-- Name: FUNCTION apply_rls(wal jsonb, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO service_role;


--
-- Name: FUNCTION broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO postgres;
GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO dashboard_user;


--
-- Name: FUNCTION build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO postgres;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO anon;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO service_role;


--
-- Name: FUNCTION "cast"(val text, type_ regtype); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO postgres;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO dashboard_user;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO anon;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO authenticated;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO service_role;


--
-- Name: FUNCTION check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO postgres;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO anon;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO authenticated;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO service_role;


--
-- Name: FUNCTION check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text, negate boolean); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text, negate boolean) TO postgres;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text, negate boolean) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text, negate boolean) TO anon;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text, negate boolean) TO authenticated;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text, negate boolean) TO service_role;


--
-- Name: FUNCTION is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO postgres;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO anon;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO service_role;


--
-- Name: FUNCTION list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO dashboard_user;


--
-- Name: FUNCTION quote_wal2json(entity regclass); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO postgres;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO anon;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO authenticated;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO service_role;


--
-- Name: FUNCTION send(payload jsonb, event text, topic text, private boolean); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO postgres;
GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO dashboard_user;


--
-- Name: FUNCTION send_binary(payload bytea, event text, topic text, private boolean); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.send_binary(payload bytea, event text, topic text, private boolean) TO postgres;
GRANT ALL ON FUNCTION realtime.send_binary(payload bytea, event text, topic text, private boolean) TO dashboard_user;


--
-- Name: FUNCTION subscription_check_filters(); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO postgres;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO dashboard_user;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO anon;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO authenticated;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO service_role;


--
-- Name: FUNCTION to_regrole(role_name text); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO postgres;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO anon;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO authenticated;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO service_role;


--
-- Name: FUNCTION topic(); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.topic() TO postgres;
GRANT ALL ON FUNCTION realtime.topic() TO dashboard_user;


--
-- Name: FUNCTION wal2json_escape_identifier(name text); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.wal2json_escape_identifier(name text) TO postgres;
GRANT ALL ON FUNCTION realtime.wal2json_escape_identifier(name text) TO dashboard_user;


--
-- Name: FUNCTION _crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO service_role;


--
-- Name: FUNCTION create_secret(new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- Name: FUNCTION update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- Name: TABLE audit_log_entries; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.audit_log_entries TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.audit_log_entries TO postgres;
GRANT SELECT ON TABLE auth.audit_log_entries TO postgres WITH GRANT OPTION;


--
-- Name: TABLE custom_oauth_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.custom_oauth_providers TO postgres;
GRANT ALL ON TABLE auth.custom_oauth_providers TO dashboard_user;


--
-- Name: TABLE flow_state; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.flow_state TO postgres;
GRANT SELECT ON TABLE auth.flow_state TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.flow_state TO dashboard_user;


--
-- Name: TABLE identities; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.identities TO postgres;
GRANT SELECT ON TABLE auth.identities TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.identities TO dashboard_user;


--
-- Name: TABLE instances; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.instances TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.instances TO postgres;
GRANT SELECT ON TABLE auth.instances TO postgres WITH GRANT OPTION;


--
-- Name: TABLE mfa_amr_claims; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_amr_claims TO postgres;
GRANT SELECT ON TABLE auth.mfa_amr_claims TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_amr_claims TO dashboard_user;


--
-- Name: TABLE mfa_challenges; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_challenges TO postgres;
GRANT SELECT ON TABLE auth.mfa_challenges TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_challenges TO dashboard_user;


--
-- Name: TABLE mfa_factors; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_factors TO postgres;
GRANT SELECT ON TABLE auth.mfa_factors TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_factors TO dashboard_user;


--
-- Name: TABLE oauth_authorizations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_authorizations TO postgres;
GRANT ALL ON TABLE auth.oauth_authorizations TO dashboard_user;


--
-- Name: TABLE oauth_client_states; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_client_states TO postgres;
GRANT ALL ON TABLE auth.oauth_client_states TO dashboard_user;


--
-- Name: TABLE oauth_clients; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_clients TO postgres;
GRANT ALL ON TABLE auth.oauth_clients TO dashboard_user;


--
-- Name: TABLE oauth_consents; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_consents TO postgres;
GRANT ALL ON TABLE auth.oauth_consents TO dashboard_user;


--
-- Name: TABLE one_time_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.one_time_tokens TO postgres;
GRANT SELECT ON TABLE auth.one_time_tokens TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.one_time_tokens TO dashboard_user;


--
-- Name: TABLE refresh_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.refresh_tokens TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.refresh_tokens TO postgres;
GRANT SELECT ON TABLE auth.refresh_tokens TO postgres WITH GRANT OPTION;


--
-- Name: SEQUENCE refresh_tokens_id_seq; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO dashboard_user;
GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO postgres;


--
-- Name: TABLE saml_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.saml_providers TO postgres;
GRANT SELECT ON TABLE auth.saml_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_providers TO dashboard_user;


--
-- Name: TABLE saml_relay_states; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.saml_relay_states TO postgres;
GRANT SELECT ON TABLE auth.saml_relay_states TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_relay_states TO dashboard_user;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT ON TABLE auth.schema_migrations TO postgres WITH GRANT OPTION;


--
-- Name: TABLE sessions; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sessions TO postgres;
GRANT SELECT ON TABLE auth.sessions TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sessions TO dashboard_user;


--
-- Name: TABLE sso_domains; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sso_domains TO postgres;
GRANT SELECT ON TABLE auth.sso_domains TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_domains TO dashboard_user;


--
-- Name: TABLE sso_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sso_providers TO postgres;
GRANT SELECT ON TABLE auth.sso_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_providers TO dashboard_user;


--
-- Name: TABLE users; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.users TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.users TO postgres;
GRANT SELECT ON TABLE auth.users TO postgres WITH GRANT OPTION;


--
-- Name: TABLE webauthn_challenges; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.webauthn_challenges TO postgres;
GRANT ALL ON TABLE auth.webauthn_challenges TO dashboard_user;


--
-- Name: TABLE webauthn_credentials; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.webauthn_credentials TO postgres;
GRANT ALL ON TABLE auth.webauthn_credentials TO dashboard_user;


--
-- Name: TABLE pg_stat_statements; Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON TABLE extensions.pg_stat_statements FROM postgres;
GRANT ALL ON TABLE extensions.pg_stat_statements TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements TO dashboard_user;


--
-- Name: TABLE pg_stat_statements_info; Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON TABLE extensions.pg_stat_statements_info FROM postgres;
GRANT ALL ON TABLE extensions.pg_stat_statements_info TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements_info TO dashboard_user;


--
-- Name: TABLE articles; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.articles TO anon;
GRANT ALL ON TABLE public.articles TO authenticated;
GRANT ALL ON TABLE public.articles TO service_role;


--
-- Name: TABLE bank_accounts; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.bank_accounts TO anon;
GRANT ALL ON TABLE public.bank_accounts TO authenticated;
GRANT ALL ON TABLE public.bank_accounts TO service_role;


--
-- Name: TABLE bimba_articles; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.bimba_articles TO anon;
GRANT ALL ON TABLE public.bimba_articles TO authenticated;
GRANT ALL ON TABLE public.bimba_articles TO service_role;


--
-- Name: TABLE donations; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.donations TO anon;
GRANT ALL ON TABLE public.donations TO authenticated;
GRANT ALL ON TABLE public.donations TO service_role;


--
-- Name: TABLE messages; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.messages TO anon;
GRANT ALL ON TABLE public.messages TO authenticated;
GRANT ALL ON TABLE public.messages TO service_role;


--
-- Name: TABLE programs; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.programs TO anon;
GRANT ALL ON TABLE public.programs TO authenticated;
GRANT ALL ON TABLE public.programs TO service_role;


--
-- Name: TABLE qurban_orders; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.qurban_orders TO anon;
GRANT ALL ON TABLE public.qurban_orders TO authenticated;
GRANT ALL ON TABLE public.qurban_orders TO service_role;


--
-- Name: TABLE qurban_settings; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.qurban_settings TO anon;
GRANT ALL ON TABLE public.qurban_settings TO authenticated;
GRANT ALL ON TABLE public.qurban_settings TO service_role;


--
-- Name: TABLE messages; Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON TABLE realtime.messages TO postgres;
GRANT ALL ON TABLE realtime.messages TO dashboard_user;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO anon;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO authenticated;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO service_role;


--
-- Name: TABLE messages_2026_05_30; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2026_05_30 TO postgres;
GRANT ALL ON TABLE realtime.messages_2026_05_30 TO dashboard_user;


--
-- Name: TABLE messages_2026_05_31; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2026_05_31 TO postgres;
GRANT ALL ON TABLE realtime.messages_2026_05_31 TO dashboard_user;


--
-- Name: TABLE messages_2026_06_01; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2026_06_01 TO postgres;
GRANT ALL ON TABLE realtime.messages_2026_06_01 TO dashboard_user;


--
-- Name: TABLE messages_2026_06_02; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2026_06_02 TO postgres;
GRANT ALL ON TABLE realtime.messages_2026_06_02 TO dashboard_user;


--
-- Name: TABLE messages_2026_06_03; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2026_06_03 TO postgres;
GRANT ALL ON TABLE realtime.messages_2026_06_03 TO dashboard_user;


--
-- Name: TABLE messages_2026_06_04; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2026_06_04 TO postgres;
GRANT ALL ON TABLE realtime.messages_2026_06_04 TO dashboard_user;


--
-- Name: TABLE messages_2026_06_05; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2026_06_05 TO postgres;
GRANT ALL ON TABLE realtime.messages_2026_06_05 TO dashboard_user;


--
-- Name: TABLE subscription; Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON TABLE realtime.subscription TO postgres;
GRANT ALL ON TABLE realtime.subscription TO dashboard_user;
GRANT SELECT ON TABLE realtime.subscription TO anon;
GRANT SELECT ON TABLE realtime.subscription TO authenticated;
GRANT SELECT ON TABLE realtime.subscription TO service_role;


--
-- Name: SEQUENCE subscription_id_seq; Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO postgres;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO dashboard_user;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO anon;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO service_role;


--
-- Name: TABLE buckets; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

REVOKE ALL ON TABLE storage.buckets FROM supabase_storage_admin;
GRANT ALL ON TABLE storage.buckets TO supabase_storage_admin WITH GRANT OPTION;
GRANT ALL ON TABLE storage.buckets TO service_role;
GRANT ALL ON TABLE storage.buckets TO authenticated;
GRANT ALL ON TABLE storage.buckets TO anon;
GRANT ALL ON TABLE storage.buckets TO postgres WITH GRANT OPTION;


--
-- Name: TABLE buckets_analytics; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.buckets_analytics TO service_role;
GRANT ALL ON TABLE storage.buckets_analytics TO authenticated;
GRANT ALL ON TABLE storage.buckets_analytics TO anon;


--
-- Name: TABLE buckets_vectors; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT ON TABLE storage.buckets_vectors TO service_role;
GRANT SELECT ON TABLE storage.buckets_vectors TO authenticated;
GRANT SELECT ON TABLE storage.buckets_vectors TO anon;


--
-- Name: TABLE objects; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

REVOKE ALL ON TABLE storage.objects FROM supabase_storage_admin;
GRANT ALL ON TABLE storage.objects TO supabase_storage_admin WITH GRANT OPTION;
GRANT ALL ON TABLE storage.objects TO service_role;
GRANT ALL ON TABLE storage.objects TO authenticated;
GRANT ALL ON TABLE storage.objects TO anon;
GRANT ALL ON TABLE storage.objects TO postgres WITH GRANT OPTION;


--
-- Name: TABLE s3_multipart_uploads; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO anon;


--
-- Name: TABLE s3_multipart_uploads_parts; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads_parts TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO anon;


--
-- Name: TABLE vector_indexes; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT ON TABLE storage.vector_indexes TO service_role;
GRANT SELECT ON TABLE storage.vector_indexes TO authenticated;
GRANT SELECT ON TABLE storage.vector_indexes TO anon;


--
-- Name: TABLE secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.secrets TO service_role;


--
-- Name: TABLE decrypted_secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.decrypted_secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.decrypted_secrets TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON SEQUENCES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON FUNCTIONS TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON TABLES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO service_role;


--
-- Name: ensure_rls; Type: EVENT TRIGGER; Schema: -; Owner: postgres
--

CREATE EVENT TRIGGER ensure_rls ON ddl_command_end
         WHEN TAG IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
   EXECUTE FUNCTION public.rls_auto_enable();


ALTER EVENT TRIGGER ensure_rls OWNER TO postgres;

--
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_graphql_placeholder ON sql_drop
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();


ALTER EVENT TRIGGER issue_graphql_placeholder OWNER TO supabase_admin;

--
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


ALTER EVENT TRIGGER issue_pg_cron_access OWNER TO supabase_admin;

--
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_graphql_access ON ddl_command_end
         WHEN TAG IN ('CREATE FUNCTION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();


ALTER EVENT TRIGGER issue_pg_graphql_access OWNER TO supabase_admin;

--
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();


ALTER EVENT TRIGGER issue_pg_net_access OWNER TO supabase_admin;

--
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_ddl_watch ON ddl_command_end
   EXECUTE FUNCTION extensions.pgrst_ddl_watch();


ALTER EVENT TRIGGER pgrst_ddl_watch OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_drop_watch ON sql_drop
   EXECUTE FUNCTION extensions.pgrst_drop_watch();


ALTER EVENT TRIGGER pgrst_drop_watch OWNER TO supabase_admin;

--
-- PostgreSQL database dump complete
--

\unrestrict QueKk5ni9iD37FfB0QsRJqKisDxE5tg99u1sQRcVvGW0yRorjxvh7gUhEZAiWHd

