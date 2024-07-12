CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE regions (
	code varchar(3) PRIMARY KEY,
	`name` varchar NOT NULL,
	gateway boolean NOT NULL,
	premium boolean NOT NULL,
	`location` geography(POINT,4326) NOT NULL
	--,process_group text
)
