const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function check() {
  const client = new Client({
    connectionString: process.env.POSTGRES_URL
  });
  await client.connect();
  const res = await client.query('SELECT id, name, "campaignId", "vaccineId", "totalAllocated" FROM "CampaignVaccine"');
  console.log('CampaignVaccine:', res.rows);
  
  const res2 = await client.query('SELECT id, name, status FROM "VaccineCampaign"');
  console.log('VaccineCampaign:', res2.rows);
  
  const res3 = await client.query('SELECT * FROM "Vaccine"');
  console.log('Vaccine:', res3.rows);

  await client.end();
}

check().catch(console.error);
