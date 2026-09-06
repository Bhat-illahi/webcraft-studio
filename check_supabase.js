const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://imuqwquuytcfuqbpaqoa.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltdXF3cXV1eXRjZnVxYnBhcW9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NTQwNzcsImV4cCI6MjA5MTAzMDA3N30.J_E1pbC8nJKMsIMJE-IAnI_3lV47q6WX0HuSSWIhpd4';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkSettings() {
    const { data, error } = await supabase.from('site_settings').select('*');
    if (error) {
        console.error('Error fetching settings:', error);
        return;
    }
    console.log('--- SITE SETTINGS ---');
    data.forEach(s => {
        console.log(`${s.key}: ${s.value}`);
    });
}

checkSettings();
