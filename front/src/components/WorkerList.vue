<template>
	<div id="app" @click.left="showMenu = false;">
        <div id="list">
            <h1>Список сотрудников</h1>
            <table border="1">
                <tr>
                    <th>ФИО</th>
                    <th>Кол-во</th>
                    <th>Общая стоимость</th>
                </tr>
                <template v-for="(item,index) in workers" >
                    <tr 
                        :class="(selectedIndex == index) ? 'selected' : ''"
                        @click.left="selectItem(index)"
                        @click.right.prevent="contextMenu(index,$event,item)"
                        @dblclick="editItem(item.id)"
                        @mousemove ="showItem(item,$event)"
                        @mouseout ="hideItem()"
                    >
                        <td>{{ fio(item) }}</td>
                        <td :class="item.selected">{{ item.length }}</td>
                        <td :class="item.selected">{{ item.itogo }}</td>
                    </tr>
                </template>
            </table>
            <br>
            <router-link 
                key="AddKey"
                :to="{ path: 'WorkerEdit/0'}"
                tag="span"
                class="addButton"
            >
              [ Добавить ]
            </router-link>

            
        </div>
        <div id="about" 
            v-if="about"
            :style="{ left: clientX , top: clientY }"
            >
            <div>Фамилия: <b>{{itemInfo.surname}}</b></div>
            <div>Имя: <b>{{itemInfo.name}}</b></div>
            <div>Отчество: <b>{{itemInfo.patronymic}}</b></div>
            <div>Список выданных материальных ценностей:</div>
            <template v-if="items.length > 0">
                <table>
                    <tr>
                        <th>№</th>
                        <th>Название</th>
                        <th>Стоимость</th>
                    </tr>
                    <tr v-for="(item,index) in items">
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.name}}</td>
                        <td>{{ item.stoimost}}</td>
                        <td>
                    </td>
                    </tr>
                    <tr>    
                        <th colspan="2" style="align:right">Итого</th>
                        <th>{{ itemInfo.itogo }}</th>
                    </tr>
                </table>
            </template>
        </div>
        <div id="contextMenu" 
            v-if="showMenu"
            :style="{ left: clientX , top: clientY }"
            >
            <div @click="deleteItem()">Удалить</div>           
        </div>
	</div>
</template>

<style lang="scss" scoped>
table {
    border-collapse: separate;
    border-spacing: 0px;
    & > tr:not(:first-child) {
        text-align:center;
        cursor:pointer;
        & > td {
            width:100px;
        }
        & > td:first-child {
            width:300px;
        }
        & > td:last-child {
            width:200px;
        }
        &.selected > td {
            background: blue;
            color:white;
        }
    }
}
fieldset {
    width:1px;
    text-align:center;
}
#app {
    display:flex;
    & > #list {
        margin:auto;
        width:500px;
        border:1px solid #999;
        padding:40px;
        text-align:center;
    }
}
.addButton {
    cursor: pointer;
}

#about {
    position:fixed;
    background:white;
    padding:20px;
    border:1px solid #000;
}

#contextMenu {
    position:fixed;
    border:1px solid #999;
    background:#DCDCDC;
    padding:2px 0px;
    color:black;
    & > div {
        padding:2px 10px;
        cursor:default;
        &:hover {
            background:#4682B4;
        }
    }
}
</style>

<script>
	import {mapActions} from 'vuex';
	import {mapGetters} from 'vuex';

	export default {
        data() {
            return {
                selectedIndex:-1,
                timeOut:false,
                itemInfo:{},
                items:[],
                about:false,
                clientX:0,
                clientY:0,
                showMenu:false,
                deleteItemObj:{}
            }
        },
        created(){
            this.$store.dispatch('worker/loadItems');
           
		},
		computed: {
			...mapGetters('worker', {
				workers: 'items'
			}),
		},
        methods: {        
            ...mapActions('worker', {
				saveItems: 'saveItems',
				deleteWorker: 'deleteWorker',
            }),
            set_itemInfo(worker) {
                this.itemInfo = worker;
                try {
                    this.items = JSON.parse(worker.items)
                } catch (error) {
                    this.items = []
                }
            },
            fio(element){
                var name = (element.name.length > 1) ? element.name[0].toUpperCase() + ". " : element.name[0].toUpperCase() + " "
                if (element.patronymic) {
                    var patronymic = (element.patronymic.length > 1) ? element.patronymic[0].toUpperCase() + ". " : element.patronymic[0].toUpperCase() + " "
                } else {
                    var patronymic = ""
                }
                return element.surname + " " + name + " " + patronymic
            },
			onOrder(){
				this.$router.push('/checkout');
            },
            selectItem(index) {
                this.selectedIndex = index
            },
            editItem(index) {
                this.$router.push('/WorkerEdit/' + index);
            },
            showItem(item,event) {
                if (!this.showMenu) {
                    this.clientX = event.clientX + 5 + "px";
                    this.clientY = event.clientY + 5 + "px";
                    clearInterval(this.timeOut)
                    this.timeOut = setTimeout(() => {
                        this.set_itemInfo(item);
                        this.about = true;
                    },50);  
                }              
            },
            contextMenu(index,event,item) {
                this.hideItem()
                this.clientX = event.clientX + 5 + "px";
                this.clientY = event.clientY + 5 + "px";
                this.showMenu = true;
                this.selectedIndex = index;
                this.deleteItemObj = item;              
            },
            hideItem() {
                clearInterval(this.timeOut);   
                this.about = false;
            },
            deleteItem() {
                if (confirm("Вы точно хотите удалить: " + this.fio(this.deleteItemObj) + "?")) {
                    this.deleteWorker({id:this.deleteItemObj.id})
                }
            }
        },
        watch:{

        }
	}
</script>