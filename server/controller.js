require('dotenv').config()
//console.log(process.env)

const { Sequelize } = require('sequelize');
const { CONNECTION_STRING } = process.env;

/*
I should probably point out that
I got the following code 
straing from heroku's website
This is how they say to connect using
sequelize\
*/

sequelize = new Sequelize(CONNECTION_STRING, {
        dialectOptions: {
              ssl: {
                      require: true,
                              rejectUnauthorized: false
                                    }
                                        }
                                          }
                                          );

sequelize
  .authenticate()
  .then(() => {
      console.log('Connection has been established successfully.');
        })
          .catch(err => {
              console.error('Unable to connect to the database:', err);
                });

module.exports = {
    deleteCity: (req, res) => {
        const { city_id } = req.params;
        sequelize.query(`
            DELETE FROM cities
                WHERE ${city_id} = city_id;
        `).then((dbRes) => {
            res.status(200).send(dbRes[0])
        }).catch(err => console.log('ERROR DELETING CITY', err))
    },
    getCities: (req, res) => {
        sequelize.query(`
           SELECT c.name AS city, rating
           FROM cities AS c
                JOIN countries AS countries
                    ON c.country_id = countries.country_id;
        `).then((dbRes) => {
            res.status(200).send(dbRes[0])
        }).catch(err => console.log('ERROR GETTING LIST OF CITIES', err))
    },
    createCity: (req, res) => {
        const { name } = req.body;
        const { rating } = req.body;
        const { countryId } = req.body;
        sequelize.query(`
           INSERT INTO cities(name, rating, country_id)
           VALUES
                (${name}, ${rating}, ${countryId});
        `).then((dbRes) => {
            res.status(200).send(dbRes[0])
        }).catch(err => console.log('ERROR ENTERING NEW CITY', err))
    },
    getCountries: (req, res) => {
        sequelize.query(`
            SELECT * FROM countries;
        `).then((dbRes) => {
                res.status(200).send(dbRes[0]) 
            }).catch(err => console.log('ERROR GETTING LIST OF COUNTRIES', err))
    },        
    seed: (req, res) => {
        sequelize.query(`
            drop table if exists cities;
            drop table if exists countries;

            create table countries (
                country_id serial primary key, 
                name varchar
            );

            CREATE TABLE cities (
                city_id serial PRIMARY KEY,
                name VARCHAR (255),
                rating INTEGER,
                country_id INTEGER,
                CONSTRAINT fk_countries FOREIGN KEY (country_id) REFERENCES countries (country_id)
            );

            insert into countries (name)
            values ('Afghanistan'),
            ('Albania'),
            ('Algeria'),
            ('Andorra'),
            ('Angola'),
            ('Antigua and Barbuda'),
            ('Argentina'),
            ('Armenia'),
            ('Australia'),
            ('Austria'),
            ('Azerbaijan'),
            ('Bahamas'),
            ('Bahrain'),
            ('Bangladesh'),
            ('Barbados'),
            ('Belarus'),
            ('Belgium'),
            ('Belize'),
            ('Benin'),
            ('Bhutan'),
            ('Bolivia'),
            ('Bosnia and Herzegovina'),
            ('Botswana'),
            ('Brazil'),
            ('Brunei'),
            ('Bulgaria'),
            ('Burkina Faso'),
            ('Burundi'),
            ('C??te d''Ivoire'),
            ('Cabo Verde'),
            ('Cambodia'),
            ('Cameroon'),
            ('Canada'),
            ('Central African Republic'),
            ('Chad'),
            ('Chile'),
            ('China'),
            ('Colombia'),
            ('Comoros'),
            ('Congo'),
            ('Costa Rica'),
            ('Croatia'),
            ('Cuba'),
            ('Cyprus'),
            ('Czech Republic'),
            ('Democratic Republic of the Congo'),
            ('Denmark'),
            ('Djibouti'),
            ('Dominica'),
            ('Dominican Republic'),
            ('Ecuador'),
            ('Egypt'),
            ('El Salvador'),
            ('Equatorial Guinea'),
            ('Eritrea'),
            ('Estonia'),
            ('Eswatini'),
            ('Ethiopia'),
            ('Fiji'),
            ('Finland'),
            ('France'),
            ('Gabon'),
            ('Gambia'),
            ('Georgia'),
            ('Germany'),
            ('Ghana'),
            ('Greece'),
            ('Grenada'),
            ('Guatemala'),
            ('Guinea'),
            ('Guinea-Bissau'),
            ('Guyana'),
            ('Haiti'),
            ('Holy See'),
            ('Honduras'),
            ('Hungary'),
            ('Iceland'),
            ('India'),
            ('Indonesia'),
            ('Iran'),
            ('Iraq'),
            ('Ireland'),
            ('Israel'),
            ('Italy'),
            ('Jamaica'),
            ('Japan'),
            ('Jordan'),
            ('Kazakhstan'),
            ('Kenya'),
            ('Kiribati'),
            ('Kuwait'),
            ('Kyrgyzstan'),
            ('Laos'),
            ('Latvia'),
            ('Lebanon'),
            ('Lesotho'),
            ('Liberia'),
            ('Libya'),
            ('Liechtenstein'),
            ('Lithuania'),
            ('Luxembourg'),
            ('Madagascar'),
            ('Malawi'),
            ('Malaysia'),
            ('Maldives'),
            ('Mali'),
            ('Malta'),
            ('Marshall Islands'),
            ('Mauritania'),
            ('Mauritius'),
            ('Mexico'),
            ('Micronesia'),
            ('Moldova'),
            ('Monaco'),
            ('Mongolia'),
            ('Montenegro'),
            ('Morocco'),
            ('Mozambique'),
            ('Myanmar'),
            ('Namibia'),
            ('Nauru'),
            ('Nepal'),
            ('Netherlands'),
            ('New Zealand'),
            ('Nicaragua'),
            ('Niger'),
            ('Nigeria'),
            ('North Korea'),
            ('North Macedonia'),
            ('Norway'),
            ('Oman'),
            ('Pakistan'),
            ('Palau'),
            ('Palestine State'),
            ('Panama'),
            ('Papua New Guinea'),
            ('Paraguay'),
            ('Peru'),
            ('Philippines'),
            ('Poland'),
            ('Portugal'),
            ('Qatar'),
            ('Romania'),
            ('Russia'),
            ('Rwanda'),
            ('Saint Kitts and Nevis'),
            ('Saint Lucia'),
            ('Saint Vincent and the Grenadines'),
            ('Samoa'),
            ('San Marino'),
            ('Sao Tome and Principe'),
            ('Saudi Arabia'),
            ('Senegal'),
            ('Serbia'),
            ('Seychelles'),
            ('Sierra Leone'),
            ('Singapore'),
            ('Slovakia'),
            ('Slovenia'),
            ('Solomon Islands'),
            ('Somalia'),
            ('South Africa'),
            ('South Korea'),
            ('South Sudan'),
            ('Spain'),
            ('Sri Lanka'),
            ('Sudan'),
            ('Suriname'),
            ('Sweden'),
            ('Switzerland'),
            ('Syria'),
            ('Tajikistan'),
            ('Tanzania'),
            ('Thailand'),
            ('Timor-Leste'),
            ('Togo'),
            ('Tonga'),
            ('Trinidad and Tobago'),
            ('Tunisia'),
            ('Turkey'),
            ('Turkmenistan'),
            ('Tuvalu'),
            ('Uganda'),
            ('Ukraine'),
            ('United Arab Emirates'),
            ('United Kingdom'),
            ('United States of America'),
            ('Uruguay'),
            ('Uzbekistan'),
            ('Vanuatu'),
            ('Venezuela'),
            ('Vietnam'),
            ('Yemen'),
            ('Zambia'),
            ('Zimbabwe');
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    }
}
