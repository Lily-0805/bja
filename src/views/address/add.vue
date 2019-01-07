<template>
	<div class="address">
		<div class="title" v-if="isNewforAddr">新增地址</div>
		<div class="title" v-if="isEditforAddr">修改地址</div>
		<div class="form-div">
			<div class="box">
				<input type="text" maxlength="5" class="name" v-model="form.name" placeholder="姓 名" />
				<input type="tel" maxlength="15" class="phone" v-model="form.contact" placeholder="手机号或0开头的固话" />
			</div>
			<div class="box">
				<div class="adr" @click="chooseSsq()">
					<span class="s" v-if="isFromOrder && isFromAddr">寄</span>
					<span class="s base-ba" v-if="isFromOrder && !isFromAddr">收</span>
					<i class="icon-arrow-down"></i>
					<span class="ssq" v-if="form.province!=''">{{form.province}},{{form.city}},{{form.area}}</span>
					<span class="ssq text" v-else>省 市 区</span>
				</div>
				<input class="detailAddr" type="text" maxlength="50" v-model="form.detailAddr" placeholder="详细地址(详细到门牌号)" />
			</div>
			<div class="adr3">
				<label v-if="isFromOrder"><input type="checkbox" checked value="saveNew" v-model="saveNew" /> 保存到地址簿</label>
				<button class="clear" @click="clear()">清空当前信息</button>
			</div>
		</div>
		<div class="addrList" v-if="isFromOrder">
			<ul>
				<li @click="setAddr(item.name,item.contact,item.province,item.city,item.area,item.detailAddr)" v-for="item in addrList">
					<p><span class="contact">{{item.contact}}</span>{{item.name}}</p>
					<p>{{item.province}}{{item.city}}{{item.area}}{{item.detailAddr}}</p>
				</li>
			</ul>
		</div>
		<p class="go" v-if="isFromOrder"><span class="base-te go" @click="goList()">进入地址簿，查看更多&gt;</span></p>
		<button class="save base-ba" @click="save()">确定</button>
	</div>
</template>
<style>
.address .title{ width: 100%; height: 50px; background: #000; font-size: 18px; color: #fff; line-height: 50px; text-align: center;}
.address .form-div{ overflow: hidden; padding: 10px; background: #fff;}
.address .box{ margin-bottom: 10px; width: 100%; box-sizing: border-box; border: 1px solid #ddd; border-radius: 4px;}
.address .box .name{ margin: 5px 0; padding: 0 10px; width: 50%; height: 30px; box-sizing: border-box; border: none;}
.address .box .phone{ margin: 5px 0; padding: 0 10px; width: 50%; height: 30px; box-sizing: border-box; border: none; border-left: 1px solid #ddd;}
.address .box .adr{ position: relative; display: flex; padding: 0 10px; height: 50px; border-bottom: 1px solid #ddd;}
.address .box .adr .s{ margin: 10px 10px 10px 0; float: left; width: 30px; height: 30px; background: #000; border-radius: 50%; color: #fff; line-height: 30px; text-align: center;}
.address .box .adr .ssq{ float: left; flex: 1; padding-right: 20px; overflow: hidden; height: 50px; line-height: 50px; white-space: nowrap; text-overflow: ellipsis;}
.address .box .adr .ssq.text{ color: #999}
.address .box .icon-arrow-down{ position: absolute; right: 10px; top: 18px;}
.address .box .detailAddr{ padding: 0 10px; width: 100%; height: 50px; box-sizing: border-box; line-height: 50px; border: none;}
.address .adr3 .clear{ float: right; border: none; background: none; color: #666;}
.address .addrList{ border-top: 10px solid #ddd;}
.address .addrList li{ padding: 10px; border-bottom: 1px solid #ddd;}
.address .addrList .contact{ float: right;}
.address .addrList p{ padding: 5px 0; font-size: 12px;}
.address .go{ padding-top: 20px; padding-bottom: 60px; text-align: center;}
.address .go a{ text-decoration: underline;}
.address  .save{ position: fixed; bottom: 0; left: 0; width: 100%; height:40px; border: none; font-size: 14px; color: #fff;}
@import "./../../../public/static/plugin/iosselect/iosSelect.css";
</style>
<script>
	import service from '@/services/services'
	import auth from './../../utils/auth'
	import IosSelect from './../../../public/static/plugin/iosselect/iosSelect.js'
	import areaData from './../../../public/static/plugin/iosselect/areaData.js'
	export default{
		data(){
			return {
				form:{
					customerId:'',
					addressId:'',
					name:'',
					contact:'',
					province:'',
					city:'',
					area:'',
					detailAddr:'',
				},
				addrList:[],
				saveNew:'saveNew',
				isNewforAddr:false,
				isEditforAddr:false,
				isFromOrder:false,
				isFromAddr:false,

				provinceId:'440000',
				cityId:'440100',
				areaId:'440103',

				saveFlag:false//保存按钮状态
			}
		},

		created () {

			this.form.customerId=auth.getToken('customerId')
			if(this.$route.query.target=='add'){
				this.isNewforAddr=true;
			}else if(this.$route.query.target=='edit'){
				this.isEditforAddr=true;
				this.form.addressId=this.$route.query.id
				if(auth.getToken('customerId')){
					this.getAddrDetail();
				}

			}else{
				this.isFromOrder=true;
				if(this.$route.query.target=='from'){
					this.isFromAddr=true;
					if(sessionStorage.getItem("fromData")){
						let fromData = JSON.parse(sessionStorage.getItem("fromData"));
						this.form.name=fromData.fromName;
						this.form.contact=fromData.fromContact;
						this.form.province=fromData.fromProvince;
						this.form.city=fromData.fromCity;
						this.form.area=fromData.fromArea;
						this.form.detailAddr=fromData.fromDetailAddr;
					}
				}
				if(this.$route.query.target=='to'){
					if(sessionStorage.getItem("toData")){
						let toData = JSON.parse(sessionStorage.getItem("toData"));
						this.form.name=toData.toName;
						this.form.contact=toData.toContact;
						this.form.province=toData.toProvince;
						this.form.city=toData.toCity;
						this.form.area=toData.toArea;
						this.form.detailAddr=toData.toDetailAddr;
					}
				}
				if(auth.getToken('customerId')){
					this.getAddrList()
				}

			}
		},
		methods:{
			//获取地址详情
			getAddrDetail() {
				service.addrDetail({customerId:this.form.customerId,addressId:this.form.addressId}).then(rs => {
					this.form.name=rs.data.customerAddress.name;
					this.form.contact=rs.data.customerAddress.contact;
					this.form.province=rs.data.customerAddress.province;
					this.form.city=rs.data.customerAddress.city;
					this.form.area=rs.data.customerAddress.area;
					this.form.detailAddr=rs.data.customerAddress.detailAddr;
				})
			},

			//获取最近的列表
			getAddrList(){
				service.addrList({customerId:this.form.customerId,page:1}).then(rs => {
					this.addrList=rs.data.list;
				})
			},


			//选择已有地址
			setAddr(name,contact,province,city,area,detailAddr){
				this.form.name=name;
				this.form.contact=contact;
				this.form.province=province;
				this.form.city=city;
				this.form.area=area;
				this.form.detailAddr=detailAddr;
			},


			//选择省市区
			chooseSsq(){

				let that =this;
				console.log(that.provinceId)
				let oneLevelId = that.provinceId;
				let twoLevelId = that.cityId;
				let threeLevelId = that.areaId;
				let iosSelect = new IosSelect(3,
					[areaData.iosProvinces, areaData.iosCitys, areaData.iosCountys],
					{
						title: '地址选择',
						itemHeight: 35,
						relation: [1, 1],
						oneLevelId: oneLevelId,
						twoLevelId: twoLevelId,
						threeLevelId: threeLevelId,
						callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
							that.form.province=selectOneObj.value;
							that.form.city=selectTwoObj.value;
							that.form.area=selectThreeObj.value;

							that.provinceId=selectOneObj.id;
							that.cityId=selectTwoObj.id;
							that.areaId=selectThreeObj.id;
						}
					});
			},


			clear(){
				this.form.customerId='';
				this.form.addressId='';
				this.form.name='';
				this.form.contact='';
				this.form.province='';
				this.form.city='';
				this.form.area='';
				this.form.detailAddr='';
			},


			save(){
				let that = this;
				let name = that.form.name;
				let contact = that.form.contact;
				let province = that.form.province;
				let city = that.form.city;
				let area = that.form.area;
				let detailAddr = that.form.detailAddr;

				if(name==''){
					alert("请输入姓名")
					return;
				}
				if(contact==''){
					alert("请输入手机号或固话")
					return;
				}

				let RegExp = /^((0\d{2,3}\d{7,8})|(1[3584]\d{9}))$/;
				if (RegExp.test(contact) == false) {
					alert("号码格式不正确或者位数不正确");
					return;
				}

				if(province==''){
					alert("请选择省市区")
					return;
				}
				if(detailAddr==''){
					alert("请输入详细地址")
					return;
				}


				if(that.$route.query.target=='from'){
					sessionStorage.setItem("fromData",JSON.stringify(
						{fromName:name,
						fromContact:contact,
						fromProvince:province,
						fromCity:city,
						fromArea:area,
						fromDetailAddr:detailAddr}
					));
					that.$router.push({
						path: '/'
					})
				}

				if(that.$route.query.target=='to'){
					sessionStorage.setItem("toData",JSON.stringify(
						{toName:name,
							toContact:contact,
							toProvince:province,
							toCity:city,
							toArea:area,
							toDetailAddr:detailAddr}
					));
					that.$router.push({
						path: '/'
					})
				}

				if(that.saveFlag){
					return;
				}

				if(that.$route.query.target=='add'){
					service.addAddr(that.form).then(rs => {
						that.saveFlag=true;
						if(rs.data.retCode=='000100'){

							that.$router.push({
								path: '/address/list',
								query:{target: that.$route.query.for}
							})
						}else{
							that.saveFlag=false;
							alert('add'+rs.data.retMsg)
						}
					})
					return;
				}else if(that.$route.query.target=='edit'){
					service.editAddr(that.form).then(rs => {
						if(rs.data.retCode=='000100'){
							that.$router.push({
								path: '/address/list',
								query:{target: that.$route.query.for}
							})
						}else{
							that.saveFlag=false;
							alert('edit'+rs.data.retMsg)
						}
					})
					return;
				}else if(that.saveNew=='saveNew'){
					service.addAddr(that.form).then(rs => {
						if(rs.data.retCode=='000100'){
							that.$router.push({
								path: '/'
							})
						}else{
							that.saveFlag=false;
							alert('saveNew'+rs.data.retMsg)
						}
					})
				}
			},


			goList(){
				let that = this;
				that.$router.push({
					path: '/address/list',
					query:{target: that.$route.query.target}
				})
			}





		}
	}
</script>