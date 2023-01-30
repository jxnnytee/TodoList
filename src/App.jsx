import { 
  Heading, 
  IconButton, 
  VStack, 
  useColorMode, 
  useToast, 
} from "@chakra-ui/react";
import TaskList from './components/Tasks';
import AddTask from './components/AddTask';
import { FaSun, FaMoon } from 'react-icons/fa'
import { useState, useEffect } from 'react'


function App() {

    const toast = useToast();
    const [tasks, setTasks] = useState(
        () => JSON.parse(localStorage.getItem('tasks')) || []
    );

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    function deleteTask(id){
        const newTasks = tasks.filter((task) => {
            return task.id !== id;
        });
        setTasks(newTasks);
    }

    function deleteTaskAll(){
        setTasks([]);
    }

    function checkTask(id){
        
        const newTasksCheck = tasks.map((task) => {
            if (task.id === id){
               task.check = !task.check;
            }
            return task;
        });

        setTasks(newTasksCheck);
    }

    function updateTask(id, body, onClose){

        const info = body.trim();

        if (!info) {
            toast({
                title: 'Oops! You forgot to add a task',
                position: 'top',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            
            return;
        }

        const newTasksUpdate = tasks.map((task) => {
            if (task.id === id){
               task.body = body;
               task.check = false
            }
            return task;
        });

        setTasks(newTasksUpdate);

        onClose();
    }

    function addTask(task){
        setTasks([...tasks, task]);
    }

    const { colorMode, toggleColorMode } = useColorMode();

    return(
        <VStack p={4} minH='100vh' pb={28}>
            <IconButton 
                icon={colorMode === 'light' ? <FaSun /> : <FaMoon />}
                isRound='true'
                size='md'
                alignSelf='flex-end'
                onClick={toggleColorMode}
            />

            <Heading
                p='5'
                fontWeight='extrabold'
                size='xl'
                bgGradient='linear(to-l, purple.300, purple.600)'
                bgClip='text'
            >
                MyTodoList
            </Heading>
            <AddTask addTask={addTask} />
            <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} deleteTaskAll={deleteTaskAll} checkTask={checkTask}/>
        </VStack>
    );
}

export default App;