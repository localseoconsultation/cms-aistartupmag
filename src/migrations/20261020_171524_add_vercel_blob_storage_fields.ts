import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'blog-api');
  CREATE TYPE "public"."enum_blogs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__blogs_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_homepage_seo_twitter_card" AS ENUM('summary_large_image', 'summary');
  CREATE TYPE "public"."enum_blog_page_seo_twitter_card" AS ENUM('summary_large_image', 'summary');
  CREATE TYPE "public"."enum_about_page_seo_twitter_card" AS ENUM('summary_large_image', 'summary');
  CREATE TYPE "public"."enum_search_page_seo_twitter_card" AS ENUM('summary_large_image', 'summary');
  CREATE TYPE "public"."enum_contact_page_seo_twitter_card" AS ENUM('summary_large_image', 'summary');
  CREATE TYPE "public"."enum_contact_thank_you_page_seo_twitter_card" AS ENUM('summary_large_image', 'summary');
  CREATE TYPE "public"."enum_newsletter_thank_you_page_seo_twitter_card" AS ENUM('summary_large_image', 'summary');
  CREATE TYPE "public"."enum_not_found_page_seo_twitter_card" AS ENUM('summary_large_image', 'summary');
  CREATE TYPE "public"."enum_site_settings_socials_platform" AS ENUM('linkedin', 'instagram', 'x', 'facebook', 'youtube');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" "enum_users_role" DEFAULT 'admin' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"enable_a_p_i_key" boolean,
  	"api_key" varchar,
  	"api_key_index" varchar,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar
  );
  
  CREATE TABLE "blogs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"excerpt" varchar,
  	"featured_image_id" integer,
  	"content" jsonb,
  	"reading_time" numeric,
  	"author_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_blogs_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "blogs_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "blogs_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "_blogs_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_excerpt" varchar,
  	"version_featured_image_id" integer,
  	"version_content" jsonb,
  	"version_reading_time" numeric,
  	"version_author_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__blogs_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_blogs_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_blogs_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "authors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"photo_id" integer,
  	"bio" varchar,
  	"website" varchar,
  	"social_links_linkedin" varchar,
  	"social_links_twitter" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "forms_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"default_value" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"placeholder" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"message" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"placeholder" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_state" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"placeholder" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"placeholder" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_radio_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_radio" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar,
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb
  );
  
  CREATE TABLE "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"submit_button_label" varchar,
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"confirmation_message" jsonb,
  	"redirect_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"blogs_id" integer,
  	"authors_id" integer,
  	"categories_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "homepage_about_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_editorial_sections_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_homepage_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"background_color" varchar NOT NULL
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_canonical_url" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_twitter_card" "enum_homepage_seo_twitter_card" DEFAULT 'summary_large_image',
  	"seo_twitter_title" varchar,
  	"seo_twitter_description" varchar,
  	"seo_twitter_image_id" integer,
  	"hero_title" varchar NOT NULL,
  	"hero_description" varchar NOT NULL,
  	"hero_cta_title" varchar NOT NULL,
  	"hero_cta_url" varchar NOT NULL,
  	"featured_image_image_id" integer NOT NULL,
  	"featured_image_alt" varchar NOT NULL,
  	"about_number" varchar NOT NULL,
  	"about_label" varchar NOT NULL,
  	"about_title" varchar NOT NULL,
  	"editorial_sections_explore_label" varchar NOT NULL,
  	"homepage_stats_image_id" integer NOT NULL,
  	"homepage_stats_image_alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "newsletter" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"input_placeholder" varchar NOT NULL,
  	"button_label" varchar NOT NULL,
  	"button_loading_label" varchar NOT NULL,
  	"note" varchar,
  	"success_url" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "blog_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_canonical_url" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_twitter_card" "enum_blog_page_seo_twitter_card" DEFAULT 'summary_large_image',
  	"seo_twitter_title" varchar,
  	"seo_twitter_description" varchar,
  	"seo_twitter_image_id" integer,
  	"hero_title" varchar NOT NULL,
  	"hero_description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_page_sections_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_founder_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_technology_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_contribute_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_canonical_url" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_twitter_card" "enum_about_page_seo_twitter_card" DEFAULT 'summary_large_image',
  	"seo_twitter_title" varchar,
  	"seo_twitter_description" varchar,
  	"seo_twitter_image_id" integer,
  	"hero_title" varchar NOT NULL,
  	"hero_description" varchar NOT NULL,
  	"founder_label" varchar NOT NULL,
  	"founder_title" varchar NOT NULL,
  	"founder_image_id" integer NOT NULL,
  	"founder_image_alt" varchar NOT NULL,
  	"technology_label" varchar NOT NULL,
  	"technology_title" varchar NOT NULL,
  	"contribute_label" varchar NOT NULL,
  	"contribute_title" varchar NOT NULL,
  	"contribute_cta_label" varchar NOT NULL,
  	"contribute_cta_href" varchar NOT NULL,
  	"contribute_cta_description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "search_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_canonical_url" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_twitter_card" "enum_search_page_seo_twitter_card" DEFAULT 'summary_large_image',
  	"seo_twitter_title" varchar,
  	"seo_twitter_description" varchar,
  	"seo_twitter_image_id" integer,
  	"hero_title" varchar NOT NULL,
  	"hero_description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page_contact_information_socials_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_canonical_url" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_twitter_card" "enum_contact_page_seo_twitter_card" DEFAULT 'summary_large_image',
  	"seo_twitter_title" varchar,
  	"seo_twitter_description" varchar,
  	"seo_twitter_image_id" integer,
  	"hero_title" varchar NOT NULL,
  	"hero_description" varchar NOT NULL,
  	"contact_information_eyebrow" varchar NOT NULL,
  	"contact_information_title" varchar NOT NULL,
  	"contact_information_coordinates_email" varchar,
  	"contact_information_coordinates_phone" varchar,
  	"contact_information_coordinates_address" varchar,
  	"contact_information_socials_label" varchar NOT NULL,
  	"contact_form_eyebrow" varchar DEFAULT 'Send a message' NOT NULL,
  	"contact_form_title" varchar DEFAULT 'Have something to share?' NOT NULL,
  	"contact_form_description" varchar DEFAULT 'Whether you have a story, partnership idea, or simply want to get in touch, send us a message.' NOT NULL,
  	"contact_form_form_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_thank_you_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_canonical_url" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_twitter_card" "enum_contact_thank_you_page_seo_twitter_card" DEFAULT 'summary_large_image',
  	"seo_twitter_title" varchar,
  	"seo_twitter_description" varchar,
  	"seo_twitter_image_id" integer,
  	"hero_eyebrow" varchar DEFAULT 'Message received' NOT NULL,
  	"hero_title" varchar DEFAULT 'Thanks for reaching out.' NOT NULL,
  	"hero_description" varchar DEFAULT 'Your message has been received. Our team will review it and get back to you as soon as possible.' NOT NULL,
  	"hero_cta_label" varchar DEFAULT 'Back to Home' NOT NULL,
  	"hero_cta_href" varchar DEFAULT '/' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "newsletter_thank_you_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_canonical_url" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_twitter_card" "enum_newsletter_thank_you_page_seo_twitter_card" DEFAULT 'summary_large_image',
  	"seo_twitter_title" varchar,
  	"seo_twitter_description" varchar,
  	"seo_twitter_image_id" integer,
  	"hero_eyebrow" varchar DEFAULT 'You''re in' NOT NULL,
  	"hero_title" varchar DEFAULT 'Thanks for subscribing.' NOT NULL,
  	"hero_description" varchar DEFAULT 'You''re now subscribed to AI Startup Magazine. We''ll send you the latest ideas, startups, technologies, and stories shaping what comes next.' NOT NULL,
  	"hero_cta_label" varchar DEFAULT 'Explore Latest Stories' NOT NULL,
  	"hero_cta_href" varchar DEFAULT '/blog' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "not_found_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_canonical_url" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_twitter_card" "enum_not_found_page_seo_twitter_card" DEFAULT 'summary_large_image',
  	"seo_twitter_title" varchar,
  	"seo_twitter_description" varchar,
  	"seo_twitter_image_id" integer,
  	"eyebrow" varchar DEFAULT '404 — Page Not Found' NOT NULL,
  	"title" varchar DEFAULT 'This page or post doesn’t exist.' NOT NULL,
  	"description" varchar DEFAULT 'The page or post you’re looking for may have been moved, removed, or never existed. Let’s get you back to something useful.' NOT NULL,
  	"cta_label" varchar DEFAULT 'Back to Home' NOT NULL,
  	"cta_href" varchar DEFAULT '/' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_logo" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"alt" varchar DEFAULT 'AI Startup Magazine' NOT NULL,
  	"href" varchar DEFAULT '/' NOT NULL,
  	"width" numeric DEFAULT 1000 NOT NULL,
  	"height" numeric DEFAULT 500 NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_socials_platform" NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"branding_logo_image_id" integer NOT NULL,
  	"branding_logo_alt" varchar DEFAULT 'AI Startup Magazine' NOT NULL,
  	"branding_logo_href" varchar DEFAULT '/' NOT NULL,
  	"branding_logo_width" numeric DEFAULT 1000 NOT NULL,
  	"branding_logo_height" numeric DEFAULT 500 NOT NULL,
  	"branding_description" varchar DEFAULT 'Ideas, intelligence, startups, and technology shaping what comes next.' NOT NULL,
  	"branding_copyright_year" numeric DEFAULT 2026 NOT NULL,
  	"branding_copyright" varchar DEFAULT 'AI Startup Magazine. All rights reserved.' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "custom_code" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"head" varchar,
  	"body_start" varchar,
  	"footer" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs_texts" ADD CONSTRAINT "blogs_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blogs_rels" ADD CONSTRAINT "blogs_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blogs_rels" ADD CONSTRAINT "blogs_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blogs_v" ADD CONSTRAINT "_blogs_v_parent_id_blogs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blogs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blogs_v" ADD CONSTRAINT "_blogs_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blogs_v" ADD CONSTRAINT "_blogs_v_version_author_id_authors_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blogs_v" ADD CONSTRAINT "_blogs_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blogs_v_texts" ADD CONSTRAINT "_blogs_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_blogs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blogs_v_rels" ADD CONSTRAINT "_blogs_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_blogs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blogs_v_rels" ADD CONSTRAINT "_blogs_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "authors" ADD CONSTRAINT "authors_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_radio_options" ADD CONSTRAINT "forms_blocks_radio_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_radio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_radio" ADD CONSTRAINT "forms_blocks_radio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blogs_fk" FOREIGN KEY ("blogs_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_about_paragraphs" ADD CONSTRAINT "homepage_about_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_editorial_sections_sections" ADD CONSTRAINT "homepage_editorial_sections_sections_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_editorial_sections_sections" ADD CONSTRAINT "homepage_editorial_sections_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_homepage_stats_stats" ADD CONSTRAINT "homepage_homepage_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_seo_twitter_image_id_media_id_fk" FOREIGN KEY ("seo_twitter_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_featured_image_image_id_media_id_fk" FOREIGN KEY ("featured_image_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_homepage_stats_image_id_media_id_fk" FOREIGN KEY ("homepage_stats_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_page" ADD CONSTRAINT "blog_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_page" ADD CONSTRAINT "blog_page_seo_twitter_image_id_media_id_fk" FOREIGN KEY ("seo_twitter_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_sections_paragraphs" ADD CONSTRAINT "about_page_sections_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_sections" ADD CONSTRAINT "about_page_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_founder_paragraphs" ADD CONSTRAINT "about_page_founder_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_technology_paragraphs" ADD CONSTRAINT "about_page_technology_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_contribute_paragraphs" ADD CONSTRAINT "about_page_contribute_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_seo_twitter_image_id_media_id_fk" FOREIGN KEY ("seo_twitter_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_founder_image_id_media_id_fk" FOREIGN KEY ("founder_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search_page" ADD CONSTRAINT "search_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search_page" ADD CONSTRAINT "search_page_seo_twitter_image_id_media_id_fk" FOREIGN KEY ("seo_twitter_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_contact_information_socials_links" ADD CONSTRAINT "contact_page_contact_information_socials_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_seo_twitter_image_id_media_id_fk" FOREIGN KEY ("seo_twitter_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_contact_form_form_id_forms_id_fk" FOREIGN KEY ("contact_form_form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_thank_you_page" ADD CONSTRAINT "contact_thank_you_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_thank_you_page" ADD CONSTRAINT "contact_thank_you_page_seo_twitter_image_id_media_id_fk" FOREIGN KEY ("seo_twitter_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "newsletter_thank_you_page" ADD CONSTRAINT "newsletter_thank_you_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "newsletter_thank_you_page" ADD CONSTRAINT "newsletter_thank_you_page_seo_twitter_image_id_media_id_fk" FOREIGN KEY ("seo_twitter_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "not_found_page" ADD CONSTRAINT "not_found_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "not_found_page" ADD CONSTRAINT "not_found_page_seo_twitter_image_id_media_id_fk" FOREIGN KEY ("seo_twitter_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_logo" ADD CONSTRAINT "site_logo_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_socials" ADD CONSTRAINT "site_settings_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_branding_logo_image_id_media_id_fk" FOREIGN KEY ("branding_logo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE UNIQUE INDEX "blogs_slug_idx" ON "blogs" USING btree ("slug");
  CREATE INDEX "blogs_featured_image_idx" ON "blogs" USING btree ("featured_image_id");
  CREATE INDEX "blogs_author_idx" ON "blogs" USING btree ("author_id");
  CREATE INDEX "blogs_seo_seo_og_image_idx" ON "blogs" USING btree ("seo_og_image_id");
  CREATE INDEX "blogs_updated_at_idx" ON "blogs" USING btree ("updated_at");
  CREATE INDEX "blogs_created_at_idx" ON "blogs" USING btree ("created_at");
  CREATE INDEX "blogs__status_idx" ON "blogs" USING btree ("_status");
  CREATE INDEX "blogs_texts_order_parent" ON "blogs_texts" USING btree ("order","parent_id");
  CREATE INDEX "blogs_rels_order_idx" ON "blogs_rels" USING btree ("order");
  CREATE INDEX "blogs_rels_parent_idx" ON "blogs_rels" USING btree ("parent_id");
  CREATE INDEX "blogs_rels_path_idx" ON "blogs_rels" USING btree ("path");
  CREATE INDEX "blogs_rels_categories_id_idx" ON "blogs_rels" USING btree ("categories_id");
  CREATE INDEX "_blogs_v_parent_idx" ON "_blogs_v" USING btree ("parent_id");
  CREATE INDEX "_blogs_v_version_version_slug_idx" ON "_blogs_v" USING btree ("version_slug");
  CREATE INDEX "_blogs_v_version_version_featured_image_idx" ON "_blogs_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_blogs_v_version_version_author_idx" ON "_blogs_v" USING btree ("version_author_id");
  CREATE INDEX "_blogs_v_version_seo_version_seo_og_image_idx" ON "_blogs_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_blogs_v_version_version_updated_at_idx" ON "_blogs_v" USING btree ("version_updated_at");
  CREATE INDEX "_blogs_v_version_version_created_at_idx" ON "_blogs_v" USING btree ("version_created_at");
  CREATE INDEX "_blogs_v_version_version__status_idx" ON "_blogs_v" USING btree ("version__status");
  CREATE INDEX "_blogs_v_created_at_idx" ON "_blogs_v" USING btree ("created_at");
  CREATE INDEX "_blogs_v_updated_at_idx" ON "_blogs_v" USING btree ("updated_at");
  CREATE INDEX "_blogs_v_latest_idx" ON "_blogs_v" USING btree ("latest");
  CREATE INDEX "_blogs_v_texts_order_parent" ON "_blogs_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "_blogs_v_rels_order_idx" ON "_blogs_v_rels" USING btree ("order");
  CREATE INDEX "_blogs_v_rels_parent_idx" ON "_blogs_v_rels" USING btree ("parent_id");
  CREATE INDEX "_blogs_v_rels_path_idx" ON "_blogs_v_rels" USING btree ("path");
  CREATE INDEX "_blogs_v_rels_categories_id_idx" ON "_blogs_v_rels" USING btree ("categories_id");
  CREATE UNIQUE INDEX "authors_slug_idx" ON "authors" USING btree ("slug");
  CREATE INDEX "authors_photo_idx" ON "authors" USING btree ("photo_id");
  CREATE INDEX "authors_updated_at_idx" ON "authors" USING btree ("updated_at");
  CREATE INDEX "authors_created_at_idx" ON "authors" USING btree ("created_at");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE INDEX "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
  CREATE INDEX "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
  CREATE INDEX "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE INDEX "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE INDEX "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE INDEX "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE INDEX "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");
  CREATE INDEX "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");
  CREATE INDEX "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE INDEX "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE INDEX "forms_blocks_radio_options_order_idx" ON "forms_blocks_radio_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_radio_options_parent_id_idx" ON "forms_blocks_radio_options" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_radio_order_idx" ON "forms_blocks_radio" USING btree ("_order");
  CREATE INDEX "forms_blocks_radio_parent_id_idx" ON "forms_blocks_radio" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_radio_path_idx" ON "forms_blocks_radio" USING btree ("_path");
  CREATE INDEX "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_blogs_id_idx" ON "payload_locked_documents_rels" USING btree ("blogs_id");
  CREATE INDEX "payload_locked_documents_rels_authors_id_idx" ON "payload_locked_documents_rels" USING btree ("authors_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "homepage_about_paragraphs_order_idx" ON "homepage_about_paragraphs" USING btree ("_order");
  CREATE INDEX "homepage_about_paragraphs_parent_id_idx" ON "homepage_about_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "homepage_editorial_sections_sections_order_idx" ON "homepage_editorial_sections_sections" USING btree ("_order");
  CREATE INDEX "homepage_editorial_sections_sections_parent_id_idx" ON "homepage_editorial_sections_sections" USING btree ("_parent_id");
  CREATE INDEX "homepage_editorial_sections_sections_image_idx" ON "homepage_editorial_sections_sections" USING btree ("image_id");
  CREATE INDEX "homepage_homepage_stats_stats_order_idx" ON "homepage_homepage_stats_stats" USING btree ("_order");
  CREATE INDEX "homepage_homepage_stats_stats_parent_id_idx" ON "homepage_homepage_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "homepage_seo_seo_og_image_idx" ON "homepage" USING btree ("seo_og_image_id");
  CREATE INDEX "homepage_seo_seo_twitter_image_idx" ON "homepage" USING btree ("seo_twitter_image_id");
  CREATE INDEX "homepage_featured_image_featured_image_image_idx" ON "homepage" USING btree ("featured_image_image_id");
  CREATE INDEX "homepage_homepage_stats_homepage_stats_image_idx" ON "homepage" USING btree ("homepage_stats_image_id");
  CREATE INDEX "blog_page_seo_seo_og_image_idx" ON "blog_page" USING btree ("seo_og_image_id");
  CREATE INDEX "blog_page_seo_seo_twitter_image_idx" ON "blog_page" USING btree ("seo_twitter_image_id");
  CREATE INDEX "about_page_sections_paragraphs_order_idx" ON "about_page_sections_paragraphs" USING btree ("_order");
  CREATE INDEX "about_page_sections_paragraphs_parent_id_idx" ON "about_page_sections_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "about_page_sections_order_idx" ON "about_page_sections" USING btree ("_order");
  CREATE INDEX "about_page_sections_parent_id_idx" ON "about_page_sections" USING btree ("_parent_id");
  CREATE INDEX "about_page_founder_paragraphs_order_idx" ON "about_page_founder_paragraphs" USING btree ("_order");
  CREATE INDEX "about_page_founder_paragraphs_parent_id_idx" ON "about_page_founder_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "about_page_technology_paragraphs_order_idx" ON "about_page_technology_paragraphs" USING btree ("_order");
  CREATE INDEX "about_page_technology_paragraphs_parent_id_idx" ON "about_page_technology_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "about_page_contribute_paragraphs_order_idx" ON "about_page_contribute_paragraphs" USING btree ("_order");
  CREATE INDEX "about_page_contribute_paragraphs_parent_id_idx" ON "about_page_contribute_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "about_page_seo_seo_og_image_idx" ON "about_page" USING btree ("seo_og_image_id");
  CREATE INDEX "about_page_seo_seo_twitter_image_idx" ON "about_page" USING btree ("seo_twitter_image_id");
  CREATE INDEX "about_page_founder_founder_image_idx" ON "about_page" USING btree ("founder_image_id");
  CREATE INDEX "search_page_seo_seo_og_image_idx" ON "search_page" USING btree ("seo_og_image_id");
  CREATE INDEX "search_page_seo_seo_twitter_image_idx" ON "search_page" USING btree ("seo_twitter_image_id");
  CREATE INDEX "contact_page_contact_information_socials_links_order_idx" ON "contact_page_contact_information_socials_links" USING btree ("_order");
  CREATE INDEX "contact_page_contact_information_socials_links_parent_id_idx" ON "contact_page_contact_information_socials_links" USING btree ("_parent_id");
  CREATE INDEX "contact_page_seo_seo_og_image_idx" ON "contact_page" USING btree ("seo_og_image_id");
  CREATE INDEX "contact_page_seo_seo_twitter_image_idx" ON "contact_page" USING btree ("seo_twitter_image_id");
  CREATE INDEX "contact_page_contact_form_contact_form_form_idx" ON "contact_page" USING btree ("contact_form_form_id");
  CREATE INDEX "contact_thank_you_page_seo_seo_og_image_idx" ON "contact_thank_you_page" USING btree ("seo_og_image_id");
  CREATE INDEX "contact_thank_you_page_seo_seo_twitter_image_idx" ON "contact_thank_you_page" USING btree ("seo_twitter_image_id");
  CREATE INDEX "newsletter_thank_you_page_seo_seo_og_image_idx" ON "newsletter_thank_you_page" USING btree ("seo_og_image_id");
  CREATE INDEX "newsletter_thank_you_page_seo_seo_twitter_image_idx" ON "newsletter_thank_you_page" USING btree ("seo_twitter_image_id");
  CREATE INDEX "not_found_page_seo_seo_og_image_idx" ON "not_found_page" USING btree ("seo_og_image_id");
  CREATE INDEX "not_found_page_seo_seo_twitter_image_idx" ON "not_found_page" USING btree ("seo_twitter_image_id");
  CREATE INDEX "site_logo_image_idx" ON "site_logo" USING btree ("image_id");
  CREATE INDEX "site_settings_socials_order_idx" ON "site_settings_socials" USING btree ("_order");
  CREATE INDEX "site_settings_socials_parent_id_idx" ON "site_settings_socials" USING btree ("_parent_id");
  CREATE INDEX "site_settings_branding_logo_branding_logo_image_idx" ON "site_settings" USING btree ("branding_logo_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "blogs" CASCADE;
  DROP TABLE "blogs_texts" CASCADE;
  DROP TABLE "blogs_rels" CASCADE;
  DROP TABLE "_blogs_v" CASCADE;
  DROP TABLE "_blogs_v_texts" CASCADE;
  DROP TABLE "_blogs_v_rels" CASCADE;
  DROP TABLE "authors" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "forms_blocks_checkbox" CASCADE;
  DROP TABLE "forms_blocks_country" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_message" CASCADE;
  DROP TABLE "forms_blocks_number" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_state" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_blocks_radio_options" CASCADE;
  DROP TABLE "forms_blocks_radio" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "homepage_about_paragraphs" CASCADE;
  DROP TABLE "homepage_editorial_sections_sections" CASCADE;
  DROP TABLE "homepage_homepage_stats_stats" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TABLE "newsletter" CASCADE;
  DROP TABLE "blog_page" CASCADE;
  DROP TABLE "about_page_sections_paragraphs" CASCADE;
  DROP TABLE "about_page_sections" CASCADE;
  DROP TABLE "about_page_founder_paragraphs" CASCADE;
  DROP TABLE "about_page_technology_paragraphs" CASCADE;
  DROP TABLE "about_page_contribute_paragraphs" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "search_page" CASCADE;
  DROP TABLE "contact_page_contact_information_socials_links" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "contact_thank_you_page" CASCADE;
  DROP TABLE "newsletter_thank_you_page" CASCADE;
  DROP TABLE "not_found_page" CASCADE;
  DROP TABLE "site_logo" CASCADE;
  DROP TABLE "site_settings_socials" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "custom_code" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_blogs_status";
  DROP TYPE "public"."enum__blogs_v_version_status";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_homepage_seo_twitter_card";
  DROP TYPE "public"."enum_blog_page_seo_twitter_card";
  DROP TYPE "public"."enum_about_page_seo_twitter_card";
  DROP TYPE "public"."enum_search_page_seo_twitter_card";
  DROP TYPE "public"."enum_contact_page_seo_twitter_card";
  DROP TYPE "public"."enum_contact_thank_you_page_seo_twitter_card";
  DROP TYPE "public"."enum_newsletter_thank_you_page_seo_twitter_card";
  DROP TYPE "public"."enum_not_found_page_seo_twitter_card";
  DROP TYPE "public"."enum_site_settings_socials_platform";`)
}
