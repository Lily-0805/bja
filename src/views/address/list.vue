<template>
	<div>
		<div class="box">
			<input type="text" maxlength="5" class="name" v-model="form.name" placeholder="姓 名" />
			<input type="tel" maxlength="11" class="phone" v-model="form.contact" placeholder="手机号或0开头的固话" />
			<div class="adr">
				<span class="s">寄</span>
				<i class="icon-arrow-right"></i>
				<span class="ssq" v-if="form.province!=''">{{form.province}},{{form.city}},{{form.area}}</span>
				<span class="ssq text" v-else>省 市 区</span>
			</div>
			<div class="adr2">
				<input type="text" maxlength="50" v-model="form.detailAddr" placeholder="" />
			</div>
			<div class="adr3">
				<label><input type="checkbox" checked value="saveNew" v-model="saveNew" /> 保存到地址簿</label>
				<button class="clear">清空当前信息</button>
			</div>
		</div>
	</div>
</template>
<style>

</style>
<script>
	export default{
		data(){
			return {
				form:{
					customerId:'',
					name:'',
					contact:'',
					province:'',
					city:'',
					area:'',
					detailAddr:'',
				},
				saveNew:'saveNew'
			}
		}
	}
</script>