import { Design } from '@/shared/design.class';
import Vue from 'vue';
import Vuex from 'vuex';
import ToDoModel from './modules/ToDoModel';
import TestModel from './modules/TestModel';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: Array<ToDoModel>(),
    design: Design,
    count: 0
  },

  mutations: {
    addToDo(state, todoModel: ToDoModel) {
      console.log('mutation');
      console.log(state, todoModel);
      state.todos.push(todoModel);
    },
    countUp(state, a: number) {
      state.count+=a;
    }
    // changeDesign(state, design: Design) {
    //   state.design = design;
    // }
  },
  actions: {
    addToDo(context, todoModel: ToDoModel) {
      console.log('action');
      console.log(context, todoModel);
      
      context.commit('addToDo', todoModel);
    },
    countUp(context, a: number){
      context.commit('countUp', a)
    }
    // changeDesign(context, design: Design) {
    //   context.commit('design', design);
    // }
  }
});