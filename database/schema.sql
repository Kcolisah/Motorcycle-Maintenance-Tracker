--
-- PostgreSQL database dump
--

\restrict Ys8gjITEZgZUgRUC5BEtt4ZjtIr9HDnflOYVlzlaCJohD5ySFShAsTdJGBScI5t

-- Dumped from database version 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: garage; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.garage (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    motorcycle_id bigint NOT NULL,
    nickname character varying(100),
    purchase_price numeric(10,2),
    current_mileage integer,
    notes text,
    added_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT garage_current_mileage_check CHECK ((current_mileage >= 0)),
    CONSTRAINT garage_purchase_price_check CHECK ((purchase_price >= (0)::numeric))
);


--
-- Name: garage_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.garage_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: garage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.garage_id_seq OWNED BY public.garage.id;


--
-- Name: maintenance_tasks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.maintenance_tasks (
    id bigint NOT NULL,
    garage_id bigint NOT NULL,
    title character varying(100) NOT NULL,
    description text,
    status character varying(30) DEFAULT 'PENDING'::character varying NOT NULL,
    due_date date,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT maintenance_tasks_status_check CHECK (((status)::text = ANY ((ARRAY['PENDING'::character varying, 'IN_PROGRESS'::character varying, 'DONE'::character varying])::text[])))
);


--
-- Name: maintenance_tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.maintenance_tasks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: maintenance_tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.maintenance_tasks_id_seq OWNED BY public.maintenance_tasks.id;


--
-- Name: motorcycles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.motorcycles (
    id bigint NOT NULL,
    brand character varying(100) NOT NULL,
    category character varying(100) NOT NULL,
    model character varying(100) NOT NULL,
    year integer NOT NULL,
    price numeric(10,2),
    image_url character varying(225) NOT NULL,
    engine character varying(100) NOT NULL,
    horsepower integer NOT NULL,
    weight_lbs integer NOT NULL,
    zero_to_sixty_seconds numeric(3,1) NOT NULL,
    top_speed_mph integer NOT NULL
);


--
-- Name: motorcycles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.motorcycles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: motorcycles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.motorcycles_id_seq OWNED BY public.motorcycles.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    username character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    password_hash text NOT NULL,
    is_demo boolean DEFAULT false NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: garage id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.garage ALTER COLUMN id SET DEFAULT nextval('public.garage_id_seq'::regclass);


--
-- Name: maintenance_tasks id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.maintenance_tasks ALTER COLUMN id SET DEFAULT nextval('public.maintenance_tasks_id_seq'::regclass);


--
-- Name: motorcycles id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.motorcycles ALTER COLUMN id SET DEFAULT nextval('public.motorcycles_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: garage garage_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.garage
    ADD CONSTRAINT garage_pkey PRIMARY KEY (id);


--
-- Name: garage garage_user_id_motorcycle_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.garage
    ADD CONSTRAINT garage_user_id_motorcycle_id_key UNIQUE (user_id, motorcycle_id);


--
-- Name: maintenance_tasks maintenance_tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.maintenance_tasks
    ADD CONSTRAINT maintenance_tasks_pkey PRIMARY KEY (id);


--
-- Name: motorcycles motorcycles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.motorcycles
    ADD CONSTRAINT motorcycles_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: idx_garage_motorcycle_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_garage_motorcycle_id ON public.garage USING btree (motorcycle_id);


--
-- Name: idx_garage_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_garage_user_id ON public.garage USING btree (user_id);


--
-- Name: garage garage_motorcycle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.garage
    ADD CONSTRAINT garage_motorcycle_id_fkey FOREIGN KEY (motorcycle_id) REFERENCES public.motorcycles(id);


--
-- Name: garage garage_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.garage
    ADD CONSTRAINT garage_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: maintenance_tasks maintenance_tasks_garage_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.maintenance_tasks
    ADD CONSTRAINT maintenance_tasks_garage_id_fkey FOREIGN KEY (garage_id) REFERENCES public.garage(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict Ys8gjITEZgZUgRUC5BEtt4ZjtIr9HDnflOYVlzlaCJohD5ySFShAsTdJGBScI5t

