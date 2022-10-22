CREATE TABLE "public.animals" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"rescue_date" DATETIME(255),
	"adoption_date" DATETIME(255),
	CONSTRAINT "animals_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.species" (
	"pet_id" serial NOT NULL,
	"species_name" varchar(255),
	CONSTRAINT "species_pk" PRIMARY KEY ("pet_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.medical_info" (
	"pet_id" serial NOT NULL UNIQUE,
	"vaccine_needed" varchar(255),
	"vaccine_received" varchar(255),
	"neutered_spayed" BINARY(255),
	CONSTRAINT "medical_info_pk" PRIMARY KEY ("pet_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.vaccine_list" (
	"pet_id" serial NOT NULL UNIQUE,
	"vaccine_1" BINARY,
	"vaccine_2" BINARY,
	"vaccine_3" BINARY,
	CONSTRAINT "vaccine_list_pk" PRIMARY KEY ("pet_id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "species" ADD CONSTRAINT "species_fk0" FOREIGN KEY ("pet_id") REFERENCES "animals"("id");

ALTER TABLE "medical_info" ADD CONSTRAINT "medical_info_fk0" FOREIGN KEY ("pet_id") REFERENCES "animals"("id");

ALTER TABLE "vaccine_list" ADD CONSTRAINT "vaccine_list_fk0" FOREIGN KEY ("pet_id") REFERENCES "animals"("id");
ALTER TABLE "vaccine_list" ADD CONSTRAINT "vaccine_list_fk1" FOREIGN KEY ("vaccine_1") REFERENCES "medical_info"("vaccine_received");
ALTER TABLE "vaccine_list" ADD CONSTRAINT "vaccine_list_fk2" FOREIGN KEY ("vaccine_2") REFERENCES "medical_info"("vaccine_received");
ALTER TABLE "vaccine_list" ADD CONSTRAINT "vaccine_list_fk3" FOREIGN KEY ("vaccine_3") REFERENCES "medical_info"("vaccine_received");





