const {createClient} = supabase;

const supabaseUrl = 'https://grxtotqofsbzgmjwbzar.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyeHRvdHFvZnNiemdtandiemFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0NjY2NjcsImV4cCI6MjA1NTA0MjY2N30.loHFYbdDtHt3o7HhZ_SHyvbdD2H1zJP5bBQZJYgajWI'
const supabaseCreate = createClient(supabaseUrl, supabaseKey)

window.supabase = supabaseCreate;

console.log(supabase); 