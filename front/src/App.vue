<template>
	<div>
		<header>
		</header>
		<section>
			
            <transition name="slide" mode="out-in">
                <router-view></router-view>
            </transition>
		</section>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex';

	export default {
		computed: {
			...mapGetters('menu', {
				menuList: 'items'
			}),
			...mapGetters('cart', {
				lengthInCart: 'cnt'
			})
		}
	}
</script>

<style>
	.menu{
		border-right: 1px solid #ddd;
	}

	.list-group-item{
		transition: background 0.3s, color 0.3s;
	}

	.list-group-item a{
		text-decoration: none;
	}

	.list-group-item.active a{
		color: inherit;
	}

	.slide-enter{
		
	}

	.slide-enter-active{
		animation: slideIn 0.5s;
	}

	.slide-enter-to{
		
	}

	.slide-leave{
		
	}

	.slide-leave-active{
		animation: slideOut 0.5s;
	}

	.slide-leave-to{
		
	}

	@keyframes slideIn{
		from{transform: rotateY(90deg);}
		to{transform: rotateY(0deg);}
	}

	@keyframes slideOut{
		from{transform: rotateY(0deg);}
		to{transform: rotateY(90deg);}
	}
</style>