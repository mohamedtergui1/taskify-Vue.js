<template>
    <div class="pb-24 bg-slate-300 pt-5 px-10 ">
        <modal-task :propactive="propactive" />
        <draggable class="w-full flex flex-wrap justify-around      ">
            <ul class="bg-white  pb-5   sm:rounded-md w-96  mt-16">
                <h2 class="text-3xl font-semibold border-b-2 mb-2 rounded p-2">to-do</h2>

                <draggable v-model="todoTasks" @input="handleInput">
                    <div v-for="(task, index) in todoTasks" :key="index"
                        class=" m-1 my-4 shadow-lg border-2 border-gray-10 rounded"
                        :style="{ left: task.left + 'px', top: task.top + 'px' }" draggable="true"
                        @dragstart="dragStart(index, $event)" @dragend="dragEnd()" ref="draggedItems">
                        <div class="px-4 py-5 sm:px-6">
                            <div class="flex items-center justify-between">
                                <p class="text-sm font-medium text-gray-500">{{ task.name }}</p>
                                <div>
                                    <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Edit</a>
                                </div>
                            </div>
                            <div class="flex mt-4 items-center justify-between">
                                <p class="mt-1 max-w-2xl text-sm text-gray-500">{{ task.description }}</p>
                            </div>
                        </div>
                    </div>
                </draggable>


            </ul>
            <ul class="bg-white  overflow-hidden  pb-5  sm:rounded-md w-96  mt-16">
                <h2 class="text-3xl font-semibold border-b-2 mb-2 rounded p-2">in-progress</h2>

                <draggable v-model="doingTasks" @input="handleInput">
                    <div v-for="(task, index) in doingTasks" :key="index"
                        class=" m-1 my-4 shadow-lg border-2 border-gray-10 rounded"
                        :style="{ left: task.left + 'px', top: task.top + 'px' }" draggable="true"
                        @dragstart="dragStart(index, $event)" @dragend="dragEnd()" ref="draggedItems">
                        <div class="px-4 py-5 sm:px-6">
                            <div class="flex items-center justify-between">
                                <p class="text-sm font-medium text-gray-500">{{ task.name }}</p>
                                <div>
                                    <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Edit</a>
                                </div>
                            </div>
                            <div class="flex mt-4 items-center justify-between">
                                <p class="mt-1 max-w-2xl text-sm text-gray-500">{{ task.description }}</p>
                            </div>
                        </div>
                    </div>
                </draggable>

            </ul>
            <ul class="bg-white  overflow-hidden  pb-5  sm:rounded-md w-96  mt-16">
                <h2 class="text-3xl font-semibold border-b-2 mb-2 rounded p-2">completed</h2>

                <draggable v-model="doneTasks" @input="handleInput">
                    <div v-for="(task, index) in doneTasks" :key="index"
                        class=" m-1 my-4 shadow-lg border-2 border-gray-10 rounded"
                        :style="{ left: task.left + 'px', top: task.top + 'px' }" draggable="true"
                        @dragstart="dragStart(index, $event)" @dragend="dragEnd()" ref="draggedItems">
                        <div class="px-4 py-5 sm:px-6">
                            <div class="flex items-center justify-between">
                                <p class="text-sm font-medium text-gray-500">{{ task.name }}</p>
                                <div>
                                    <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Edit</a>
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
            propactive : true
        }
    },
    components: {
        "modal-task": ModalAddTaskVue
        ,
        draggable
    }
    ,
    methods: {

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
        dragStart(index, event) {
            this.offsetX = event.offsetX;
            this.offsetY = event.offsetY;
        },
        dragEnd() {
           
            this.offsetX = 0;
            this.offsetY = 0;
            
        },
        onMouseMove(event) {
            const draggedItem = this.$refs.draggedItem;
            if (draggedItem) {
                draggedItem.style.left = (event.clientX - this.offsetX) + 'px';
                draggedItem.style.top = (event.clientY - this.offsetY) + 'px';
            }
        }
    },
    created() {
        this.getTasks();
    }, mounted() {
        document.addEventListener('mousemove', this.onMouseMove);
    },
    beforeDestroy() {
        document.removeEventListener('mousemove', this.onMouseMove);
    },
    updated() {
         
    }
}
</script>

<style>
.item {
    position: absolute;
    transition: none;
    /* Disable transition for smoother drag */
}
</style>