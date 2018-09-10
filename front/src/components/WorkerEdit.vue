<template>
	<div id="WorkerEdit">
        <div>
            <table>
                <tr>
                    <td>Фамилия*</td>
                    <td><input type="text" v-model="surname"></td>
                </tr>
                <tr>
                    <td>Имя*</td>
                    <td><input type="text" v-model="name"></td>
                </tr>
                <tr>
                    <td>Отчество</td>
                    <td><input type="text" v-model="patronymic"></td>
                </tr>
            </table>
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
                        <button @click="deleteItem(index)">Удалить строку</button>
                    </td>
                </tr>
                <tr>    
                    <th colspan="2" style="align:right">Итого</th>
                    <th>{{ itogo }}</th>
                </tr>
            </table>
            <button @click="add">Добавить строку</button>
            <hr>
            <button
                @click="save"
                :disabled="disabled"
            >
                <span v-if="$route.params.id == 0">
                    Добавить
                </span>
                <span v-else>
                    Сохранить
                </span>
            </button>
            <router-link :to="{path: '/'}" tag="button">Отмена</router-link>            
        </div>
    </div>
</template>
<style lang="scss" scoped>
#WorkerEdit {
    display: flex;
    & > div {
        margin:auto;
        width:700px;
        padding:20px;
        border:1px solid #999;
    }
}
table {
    width:100%;
}
</style>

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
            this.init();
		},
        computed: {
            ...mapGetters('worker', {
				editWorker: 'editWorker'
			})
		},
		methods: {
            ...mapActions('worker', {
				newWorker: 'newWorker',
				saveItems: 'loadeditWorker',
				getWorker: 'getWorker',
			}),
            save() {
                this.newWorker({
                    id:this.$route.params.id,
                    surname:this.surname, 
                    name:this.name, 
                    patronymic:this.patronymic,
                    items:JSON.stringify(this.items),
                    length:this.items.length,
                    itogo:this.itogo
                })
				this.$router.push({ path: '/'});

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
            },
            init() {
                if (this.$route.params.id != "0") {
                    this.getWorker({id:this.$route.params.id})
                }
                console.log(this.$route.params.id != 0)
            }
        },
        watch: {
            "$route"(to, from){
                this.init();
            },
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
            editWorker() {
                this.surname=this.editWorker.surname;
                this.name=this.editWorker.name;
                this.patronymic=this.editWorker.patronymic;
                this.itogo=this.editWorker.itogo;
                this.items=JSON.parse(this.editWorker.items);
            }
        }
	}
</script>