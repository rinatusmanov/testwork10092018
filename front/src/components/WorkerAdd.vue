<template>
	<div>
        <h1>WorkerAdd</h1>
        surname <input type="text" v-model="surname">
        name <input type="text" v-model="name">
        patronymic <input type="text" v-model="patronymic">
        
        <table>
            <tr>
                <th>№</th>
                <th>Название</th>
                <th>Стоимость</th>
            </tr>
            <tr v-for="(item,index) in items">
                <td>{{ index + 1 }}</td>
                <td><input type="text" v-model="item.name"></td>
                <td><input type="number" v-model.Number="item.stoimost"
                    @input="input"
                ></td>
                <td>
                    <button @click="deleteItem(index)">Delete</button>
                </td>
            </tr>
            <tr>    
                <th colspan="2" style="align:right">Итого</th>
                <th>{{ itogo }}</th>
            </tr>
        </table>
        <button @click="add">Добавить</button>
        <button
            @click="save"
            :disabled="disabled"
        >Create</button>
{{ $route.params.id }}
        <hr>
        
		<router-link :to="{name: 'WorkerList'}">Back to WorkerList</router-link>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex';
	import {mapActions} from 'vuex';

	export default {
        data() {
            return {
                surname:"", 
                name:"", 
                patronymic:"",
                disabled:true,
                items:[],
                itogo:0,
            }
        },
        created(){
			console.log($route.params.id);
			// this.$store.dispatch('worker/loadItems');
		},
		computed: {
		},
		methods: {
            ...mapActions('worker', {
				newWorker: 'newWorker',
				saveItems: 'loadeditWorker',
			}),
            save() {
                this.newWorker({
                    surname:this.surname, 
                    name:this.name, 
                    patronymic:this.patronymic,
                    items:JSON.stringify(this.items),
                    length:this.items.length,
                    itogo:this.itogo
                })
				// this.$router.push({ name: 'WorkerList'});

            },
            add() {
                this.items.push(
                    { 
                        name:"",
                        stoimost:0
                    }
                )
            },
            input() {
                var itogo = 0;
                for (let i = 0; i < this.items.length; i++) {
                    const element = this.items[i];
                    itogo += parseInt(element.stoimost,10)
                }
                this.itogo = itogo
                console.log("input")
            },
            deleteItem(i) {
                try {
                    this.items.splice(i,1);
                } catch(ex) {}
            }
        },
        watch: {
            surname() {
                if (this.surname != "" && this.name != "") {
                    this.disabled = false;
                } else {
                    this.disabled = true;
                }
            },
            name() {
                if (this.surname != "" && this.name != "") {
                    this.disabled = false;
                } else {
                    this.disabled = true;
                }
            },
            items() {
                console.log("items")
            }
        }
	}
</script>