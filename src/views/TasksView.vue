<template>
    <div class="pb-24  pt-5 px-10 ">
        <div class="center">

            <vs-dialog v-model="activeEditModal">
                <!-- <vs-alert v-show="errorStatus" relief danger>
                    <div>
                        <ul>
                            <li v-for="error in errors" :key="error.id">
                                {{ error[0] }}
                            </li>
                        </ul>
                    </div>
                </vs-alert> -->
                <div class="p-8">
                    <div class="my-6 flex gap-4">
                        <input type="text" v-model="task.name"
                            class="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                            placeholder="Full Name *" />
                    </div>
                    <div class="flex gap-4">
                        <input type="datetime-local" v-model="task.start_date"
                            class="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                            placeholder="Full Name *" />

                        <input type="datetime-local" v-model="task.end_date"
                            class="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                            placeholder="Email *" />
                    </div>
                    <div class="mt-2">
                        <textarea placeholder="description" id="text" cols="30" rows="10" v-model="task.description"
                            class="mb-10 h-40 w-full resize-none rounded-md border border-slate-300 p-5 font-semibold text-gray-300"></textarea>
                    </div>
                    <div class="text-center">

                        <vs-button @click="updateTask()" :loading="activee">
                            update
                        </vs-button>
                    </div>
                </div>

            </vs-dialog>
        </div>
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
            <ul class="bg-white  pb-5    sm:rounded-md w-96  mt-5" group-name="tello">
                <div
                    class="shadow-lg border-red-100 flex justify-between  h-16 overflow-y-hidden items-center  border-2 rounded-lg ">
                    <h2 class="text-3xl  font-semibold mb-2 rounded p-2">to-do</h2>

                    <button v-show="hasOpenLoading" disabled type="button"
                        class="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg    hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                        <svg aria-hidden="true" role="status"
                            class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor" />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="#1C64F2" />
                        </svg>
                        Loading...
                    </button>
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

                                    <vs-button ref="taskButton" flat danger @click="openDeleteModal(task.id)">
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

                <div class="shadow-lg border-blue-100  h-16 overflow-y-hidden   border-2 rounded-lg ">
                    <h2 class="text-3xl     font-semibold mb-2 rounded p-2">in-progress</h2>


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

                                    <vs-button ref="taskButton" flat danger @click="openDeleteModal(task.id)">
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

                <div class="shadow-lg border-green-100   h-16 overflow-y-hidden    border-2 rounded-lg ">
                    <h2 class="text-3xl  font-semibold mb-2 rounded p-2">completed</h2>

                </div>


                <draggable class="h-screen" @change="handlDoneChange" v-model="doneTasks" ghost-class="gostClass"
                    drag-class="dragClass" group="tasks" draggable=".item">
                    <div v-for="(task, index) in doneTasks" :key="index"
                        class=" item m-1 my-4 shadow-lg border-2 border-gray-10 rounded">
                        <div class="px-4 py-5 sm:px-6">
                            <div class="flex items-center justify-between">
                                <p class="text-sm font-medium text-gray-500">{{ task.name }}</p>
                                <div class="flex justify-end gap-1">

                                    <vs-button @click="openModalEdit(task.id)" flat>
                                        Edit
                                    </vs-button>

                                    <vs-button ref="taskButton" flat danger @click="openDeleteModal(task.id)">
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
            task: {
                id: ""
                ,
                name: ""
                ,
                status: ""
                ,
                description: ""
                ,
                start_date: ""
                ,
                end_date: ""
            },
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
            ,
            hasOpenLoading: false
            ,
            activeEditModal: false
            ,
            activee: false
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

                    }
                })
            }

        },
        handlDoneChange(event) {

            if (event.added) {
                axios.put("/tasks/changeTaskToCompleted/" + event.added.element.id).then(response => {

                    if (response.data.status) {
                        this.tasks[this.findTask(event.added.element.id)] = response.data.task

                    }
                })
            }
        },
        handlDoingChange(event) {
            if (event.added) {
                axios.put("/tasks/changeTaskToInProgress/" + event.added.element.id).then(response => {

                    if (response.data.status) {
                        this.tasks[this.findTask(event.added.element.id)] = response.data.task

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
            console.log(idTaskEdit)
            this.activeEditModal = true
            let tmp = this.tasks;

            for (let i = 0; i < tmp.length; i++) {
                if (tmp[i].id == idTaskEdit) {
                    this.task.id = tmp[i].id
                    this.task.name = tmp[i].name

                    this.task.status = tmp[i].status

                    this.task.description = tmp[i].description

                    this.task.start_date = tmp[i].start_date
                    this.task.end_date = tmp[i].end_date


                }
            }

        }
        ,
        handleTaskAdded(newTask) {
            this.todoTasks.unshift(newTask)
            console.log(newTask)
            console.log(this.todoTasks)
        },
        openModal(taskId) {
            this.idTask = taskId
            this.activeEditModal = true

        },
        openDeleteModal(taskId) {
            this.idTask = taskId
            this.modaldeleteActive = true

        }
        ,
        getTasks() {
            this.hasOpenLoading = true
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
                    this.hasOpenLoading = false

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
        },
        updateTask() {

            this.activee = true
            axios.put('/tasks/' + this.task.id, this.task)
                .then(response => {
                    // let i = this.findTask(this.idTask)

                    let tmp = this.tasks;

                    for (let i = 0; i < tmp.length; i++) {
                        if (tmp[i].id == this.task.id) {
                            tmp[i].id = this.task.id
                            tmp[i].name = this.task.name

                            tmp[i].status = this.task.status

                            tmp[i].description = this.task.description

                            tmp[i].start_date = this.task.start_date
                            tmp[i].end_date = this.task.end_date


                        }
                        this.tasks = tmp;
                    }

                    // console.log(this.tasks[i])
                    // console.log(this.task)

                    // this.tasks[i] = this.task
                    this.task.name = ""
                    this.task.description = ""
                    this.task.start_date = ""
                    this.task.end_date = ""
                    this.$emit('taskAdded', response.data.task);
                    this.activee = false
                    this.activeEditModal = false
                    this.repartitioTasks();

                })
                .catch(error => {
                    this.errors = error.response.data.errors
                    this.errorStatus = true
                }).finally(() => {
                    this.activee = 0
                });
        }
    },

    created() {
        this.getTasks();
    },
    beforeDestroy() {

    },
    updated() {

    },
    mounted() {

    }
}

</script>

<style>
.dragClass>div {

    box-shadow: 1px 2px 3px;
    border: darkblue;



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