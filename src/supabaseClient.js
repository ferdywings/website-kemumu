import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://omxljkumutfzgdjazrco.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9teGxqa3VtdXRmemdkamF6cmNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2OTA4ODksImV4cCI6MjA2NjI2Njg4OX0.y9b_-R3G49NFvOexNPVsIaH9P0FPLtLa_7kPipnTkRU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);