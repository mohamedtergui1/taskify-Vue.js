<template>
    <div class="pb-24  pt-5 px-10 ">
        <div class="pl-10">
            <modal-task @taskAdded="handleTaskAdded" @editModalClosed="handelClosedModalEdit" :Task="Edittask"
                :propactive="propactive" />
        </div>
        <vs-dialog width="550px" not-center v-model="modaldeleteActive">
            <template #header>
                <h4 class="not-margin">
                    <b>are you sure you wanna delete this task</b>
                </h4>
            </template>

            <template #footer>
                <div class="con-footer">
                    <vs-button @click="deleteTask()" transparent>
                        Ok
                    </vs-button>
                    <vs-button @click="modaldeleteActive = !modaldeleteActive" dark transparent>
                        Cancel
                    </vs-button>

                </div>
            </template>
        </vs-dialog>
        <draggable class="w-full flex flex-wrap justify-around h-screen " draggable=".item">
            <ul class="bg-white  pb-5   sm:rounded-md w-96  mt-5" group-name="tello">
                <div class="shadow-lg border-red-100   border-2 rounded-lg ">
                    <h2 class="text-3xl  font-semibold mb-2 rounded p-2">to-do</h2>

                </div>


                <draggable class="h-screen" v-model="todoTasks" @change="handleTodoChange" ghost-class="gostClass"
                    drag-class="dragClass" group="tasks" draggable=".item">
                    <div v-for="(task, index) in todoTasks" :key="index"
                        class=" item m-1 my-4 shadow-lg border-2 border-gray-10 rounded">
                        <div class="px-4 py-5 sm:px-6">
                            <div class="flex items-center justify-between">
                                <p class="text-sm font-medium text-gray-500">{{ task.name }}</p>
                                <div class="flex justify-end gap-1">

                                    <vs-button @click="openModalEdit(task.id)" flat>
                                        Edit
                                    </vs-button>

                                    <vs-button ref="taskButton" flat danger @click="openModal(task.id)">
                                        Delete
                                    </vs-button>
                                </div>
                            </div>
                            <div class="flex mt-4 items-center justify-between">
                                <p class="mt-1 max-w-2xl text-sm text-gray-500">{{ task.description }}</p>
                            </div>
                        </div>
                    </div>
                </draggable>


            </ul>

            <ul class="bg-white  overflow-hidden  pb-5  sm:rounded-md w-96  mt-5">

                <div class="shadow-lg border-blue-100   border-2 rounded-lg ">
                    <h2 class="text-3xl  font-semibold mb-2 rounded p-2">in-progress</h2>

                </div>

                <draggable class="h-screen" v-model="doingTasks" @change="handlDoingChange" ghost-class="gostClass"
                    drag-class="dragClass" group="tasks" draggable=".item">
                    <div v-for="(task, index) in doingTasks" :key="index"
                        class=" item m-1 my-4 shadow-lg border-2 border-gray-10 rounded">
                        <div class="px-4 py-5 sm:px-6">
                            <div class="flex items-center justify-between">
                                <p class="text-sm font-medium text-gray-500">{{ task.name }}</p>
                                <div class="flex justify-end gap-1">

                                    <vs-button @click="openModalEdit(task.id)" flat>
                                        Edit
                                    </vs-button>

                                    <vs-button ref="taskButton" flat danger @click="openModal(task.id)">
                                        Delete
                                    </vs-button>
                                </div>
                            </div>
                            <div class="flex mt-4 items-center justify-between">
                                <p class="mt-1 max-w-2xl text-sm text-gray-500">{{ task.description }}</p>
                            </div>
                        </div>
                    </div>
                </draggable>

            </ul>

            <ul class="bg-white  overflow-hidden  pb-5  sm:rounded-md w-96  mt-5">

                <div class="shadow-lg border-green-100   border-2 rounded-lg ">
                    <h2 class="text-3xl  font-semibold mb-2 rounded p-2">completed</h2>

                </div>


                <draggable class="h-screen" @change="handlDoneChange" v-model="doneTasks" ghost-class="gostClass" drag-class="dragClass"
                    group="tasks" draggable=".item">
                    <div v-for="(task, index) in doneTasks" :key="index"
                        class=" item m-1 my-4 shadow-lg border-2 border-gray-10 rounded">
                        <div class="px-4 py-5 sm:px-6">
                            <div class="flex items-center justify-between">
                                <p class="text-sm font-medium text-gray-500">{{ task.name }}</p>
                                <div class="flex justify-end gap-1">

                                    <vs-button @click="openModalEdit(task.id)" flat>
                                        Edit
                                    </vs-button>

                                    <vs-button ref="taskButton" flat danger @click="openModal(task.id)">
                                        Delete
                                    </vs-button>
                                </div>
                            </div>
                            <div class="flex mt-4 items-center justify-between">
                                <p class="mt-1 max-w-2xl text-sm text-gray-500">{{ task.description }}</p>
                            </div>
                        </div>
                    </div>
                </draggable>



            </ul>

        </draggable>


    </div>
</template>

<script>


import ModalAddTaskVue from '@/components/ModalAddTask.vue';
import axios from '../axios/axios-config.js';
import draggable from 'vuedraggable';
// import ModalDelete from '@/components/ModalDelete.vue';
export default {
    data() {
        return {
            tasks: []
            ,
            todoTasks: []
            ,
            doingTasks: []
            ,
            doneTasks: []
            , offsetX: 0,
            offsetY: 0
            ,
            propactive: false
            ,
            modaldeleteActive: false
            ,
            idTask: null
            ,
            Edittask: ""
        }
    },
    components: {
        "modal-task": ModalAddTaskVue

        ,
        draggable

    }



    ,
    methods: {
        handleTodoChange(event) {

            if (event.added) {
                axios.put("/tasks/changeTaskToToDo/" + event.added.element.id).then(response => {

                    if (response.data.status) {
                        this.tasks[this.findTask(event.added.element.id)] = response.data.task
                        console.log(this.tasks)
                    }
                })
            }

        },
        handlDoneChange(event){
             
            if (event.added) {
                axios.put("/tasks/changeTaskToCompleted/" + event.added.element.id).then(response => {

                    if (response.data.status) {
                        this.tasks[this.findTask(event.added.element.id)] = response.data.task
                        console.log(this.tasks)
                    }
                })
            }
        },
        handlDoingChange(event) {
            if (event.added) {
                axios.put("/tasks/changeTaskToInProgress/" + event.added.element.id).then(response => {

                    if (response.data.status) {
                        this.tasks[this.findTask(event.added.element.id)] = response.data.task
                        console.log(this.tasks)
                    }
                })
            }
        }

        ,
        handelClosedModalEdit(value) {

            if (value) {
                console.log("is changed" + value)
            }


        },
        openModalEdit(idTaskEdit) {
            this.Edittask = JSON.stringify(this.tasks[this.findTask(idTaskEdit)])
            console.log(this.Edittask)
            this.idTaskEdit = idTaskEdit
            this.propactive = true
        }
        ,
        handleTaskAdded(newTask) {
            this.todoTasks.unshift(newTask)
            console.log(newTask)
            console.log(this.todoTasks)
        },
        openModal(taskId) {
            this.idTask = taskId
            this.modaldeleteActive = !this.modaldeleteActive
        }
        ,
        getTasks() {
            axios.get('/tasks')
                .then(response => {
                    console.log(response)
                    if (response.data.status) {
                        this.tasks = response.data.data
                        this.repartitioTasks()
                    }
                    else console.log(response.data.message)
                })
                .catch(error => {
                    console.log(error)
                }).finally(() => {

                });
        },
        repartitioTasks() {
            this.todoTasks = []
            this.doingTasks = []
            this.doneTasks = []
            this.tasks.forEach(task => {
                if (task.status === "to do") this.todoTasks.push(task)
                else if (task.status === "in progress") this.doingTasks.push(task)
                else if (task.status === "completed") this.doneTasks.push(task)
            })
        },
        unsetTaskFromTables(taskID) {
            let index = this.findTask(taskID);
            if (index !== -1) {
                this.tasks.splice(index, 1);
                this.repartitioTasks();
            }
        },
        findTask(taskID) {
            for (let i = 0; i < this.tasks.length; i++) {
                if (this.tasks[i].id === taskID) {
                    return i;
                }
            }
            return -1;
        },
        deleteTask() {
            axios.delete('/tasks/' + this.idTask)
                .then(response => {
                    if (response.data.status) {
                        this.modaldeleteActive = false
                        this.tasks.splice(this.findTask(this.idTask), 1);
                        this.repartitioTasks();
                    }
                })
                .catch(error => {
                    console.log(error)
                }).finally(() => {

                });
        }
    },

    created() {
        this.getTasks();
    }, mounted() {

    },
    beforeDestroy() {

    },
    updated() {

    }
}

</script>

<style>
.dragClass>div {
    transform: rotate(5deg);

}

.gostClass {
    border: lightgray;
    border-radius: 5px;


}

.gostClass>div {
    visibility: hidden;
}

.hasOpenLoading .box-loading {
    opacity: 0;
    transform: scale(0.7);

}

.box-loading {
    width: 120px;
    height: 120px;
    position: relative;
    margin: 5px;
    border-radius: 20px;
    box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.07);
    overflow: hidden;
    cursor: pointer;
    transition: all 0.25s ease;
}

.box-loading:hover {
    transform: translate(0, -5px);
    box-shadow: 0px 15px 20px -10px rgba(0, 0, 0, 0.09);
}

.box-loading>>>.vs-loading {
    padding: 0px;
}
</style>