<template>
    <div class="center">
        <vs-dialog width="550px" not-center v-model="this.$props.active">
            <template #header>
                <h4 class="not-margin">
                    <b>are you sure you wanna delete this task</b>
                </h4>
            </template>
             
            <template #footer>
                <div class="con-footer">
                    <vs-button @click="deleteTask()"  transparent>
                        Ok
                    </vs-button>
                    <vs-button @click="close()"  dark transparent>
                        Cancel
                    </vs-button>
                    <span @click="close()"  dark transparent>
                        Cancel
                    </span>
                    
                </div>
            </template>
        </vs-dialog>
    </div>
</template>

<script>
import axios from '../axios/axios-config.js';

export default {
   
    props: {
        active: Boolean
        ,
        idTask : String
    },   
    method: {
       deleteTask(){
        axios.delete('/tasks', this.idTask)
                .then(response => {
                    console.log(response)        
                })
                .catch(error => {
                    console.log(error)
                }).finally(() => {
                     
                });
       }
       ,
       close(){
        this.$emit('modalClosed')
       }
    }
        

}
</script>

<style >
.con-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .con-footer .vs-button {
    margin: 0px;
  }
  .con-footer .vs-button .vs-button__content {
    padding: 10px 30px;
  }
  .con-footer .vs-button ~ .vs-button {
    margin-left: 10px;
  }
  .not-margin {
    margin: 0px;
    font-weight: normal;
    padding: 10px;
    padding-bottom: 0px;
  }
  .con-content {
    width: 100%;
  }
  .con-content p {
    font-size: 0.8rem;
    padding: 0px 10px;
  }
  .con-content .vs-checkbox-label {
    font-size: 0.8rem;
  }
  .con-content .vs-input-parent {
    width: 100%;
  }
  .con-content .vs-input-content {
    margin: 10px 0px;
    width: calc(100%);
  }
  .con-content .vs-input-content .vs-input {
    width: 100%;
  }
  .footer-dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: calc(100%);
  }
  .footer-dialog .new {
    margin: 0px;
    margin-top: 20px;
    padding: 0px;
    font-size: 0.7rem;
  }
  .footer-dialog .new a {
    color: rgba(var(--vs-primary), 1) !important;
    margin-left: 6px;
  }
  .footer-dialog .new a:hover {
    text-decoration: underline;
  }
  .footer-dialog .vs-button {
    margin: 0px;
  }
  
  </style>