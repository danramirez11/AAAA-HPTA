// database connection

const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config();

// Load environment variables from .env file
const supabaseUrl = process.env.SUPABASE_TEAM;
const supabaseKey = process.env.SUPABASE_KEY;

// Check if the environment variables are set
if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase URL or key is missing. Make sure to set SUPABASE_TEAM and SUPABASE_KEY environment variables.");
    process.exit(1);
}

// Create a new Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

const taskService = {
    getAllTasks: async () => {
        const { data, error } = await supabase
            .from('luz')
            .select();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    },

    /*getTaskById: async (id) => {
        const { data, error } = await supabase
            .from('Tasks')
            .select()
            .eq('id', id);
        if (error) {
            throw new Error(error.message);
        }
        return data;
    },*/

    createTask: async (task) => {
        const { error } = await supabase
            .from('luz')
            .insert(task);
        if (error) {
            throw new Error(error.message);
        }
    },

    /*updateTask: async (id, task) => {
        const { error } = await supabase
            .from('Tasks')
            .update(task)
            .eq('id', id);
        if (error) {
            throw new Error(error.message);
        }
    },

    deleteTask: async (id) => {
        const { error } = await supabase
            .from('Tasks')
            .delete()
            .eq('id', id);
        if (error) {
            throw new Error(error.message);
        }
    },*/
};

module.exports = taskService;
