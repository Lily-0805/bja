<template>
	<div class="take-order-page">
		<div class="title">收件员上门</div>
		<div class="form-div">
			<div class="choose-site">
				<div class="l">
					<div class="p send" @click="goAddress('to')">
						<span class="s base-ba">收</span>
						<div class="text" v-if="form.toName">
							<span class="n">{{form.toName}}</span>
							<span class="a">{{form.toProvince}}{{form.toCity}}</span>
						</div>
						<div class="text place" v-else>请输入收件人信息</div>
					</div>
					<div class="p send" @click="goAddress('from')">
						<span class="s">寄</span>
						<div class="text" v-if="form.fromName!=''">
							<span class="n">{{form.fromName}}</span>
							<span class="a">{{form.fromProvince}}{{form.fromCity}}</span>
						</div>
						<div class="text place" v-else>请输入寄件人信息</div>
					</div>
				</div>
				<div class="r">
					<button class="go-address base-te" @click="goAddressList('to')">地址簿</button>
					<button class="go-address base-te" @click="goAddressList('from')">地址簿</button>
				</div>
			</div>
			<div class="choose-time"  @click="chooseTime()">
				<span class="time-icon base-ba"><span></span></span>
				<i class="icon-arrow-right"></i>
				<span class="time">{{timeText}}</span>
				上门时间
			</div>
			<div class="choose-things">
				<div>
					物品
					<input v-model="form.goods" max="100" class="goods-input" placeholder="请输入物品" />
				</div>

			</div>
			<div class="choose-weight">
				<div class="weight">
					<button class="minus" @click="minus()" :disabled="form.weight==1">-</button>
					<input type="tel" v-model="form.weight" />
					<button class="add" @click="add()">+</button>
				</div>
				重量（kg）
			</div>
			<div class="message">
				<div @click="openMessage(messageFlag)">
					<i class="icon-arrow-down" v-if="messageFlag"></i>
					<i class="icon-arrow-right" v-else></i>
					捎话
				</div>
				<div class="message-list" v-show="messageFlag">
					<div>
						<span class="base-te" v-bind:class="{ on: item.checked}" v-for="(item,index) in messageList" @click="chooseMessage(index)">{{item.value}}</span>
					</div>
					<textarea maxlength="20" v-model="form.extraInfo" ref="extraInfo"></textarea>
					<div class="count">{{extraNumber}}/20</div>
				</div>
			</div>
			<div class="dtdFlag">
				<label>是否送货上门<input type="checkbox" value="1" v-model="dtdFlag" /></label>
			</div>
			<div class="xieyi">
				<label><input type="checkbox" checked value="agree" v-model="agree" /> 我已阅读并同意<router-link to="/protocol"  class="base-te">《服务协议》</router-link></label>
			</div>
		</div>
		<button class="take-order base-ba" @click="takeOrder()">下单</button>
	</div>
</template>
<style>
.take-order-page .title{ width: 100%; height: 50px; background: #000; font-size: 18px; color: #fff; line-height: 50px; text-align: center;}
.take-order-page .form-div{ padding: 10px; width: 100%; box-sizing: border-box;}
.take-order-page .choose-site{ display: flex;}

.take-order-page .choose-site .l{ flex: 1; height: 100px; border: 1px solid #ddd; border-radius: 4px;}
.take-order-page .choose-site .r{ float: right; margin-left: 10px; width: 80px; height: 100px; border: 1px solid #08d; border-radius: 4px;}

.take-order-page .choose-site .p{ padding: 10px; width: 100%; height: 50px; box-sizing: border-box; line-height: 30px;}
.take-order-page .choose-site .p:first-child{ border-bottom: 1px solid #ddd;}
.take-order-page .choose-site .s{ margin-right: 10px; float: left; width: 30px; height: 30px; background: #000; border-radius: 50%; color: #fff; text-align: center;}

.take-order-page .choose-site .text.place{color: #999;}
.take-order-page .choose-site .text .n{ float: left; overflow: hidden; width: 60px; white-space: nowrap; text-overflow: ellipsis;}
.take-order-page .choose-site .text .a{ float: right; overflow: hidden; width: 80px; white-space: nowrap; text-overflow: ellipsis;}

.take-order-page .choose-site .go-address{ width: 80px; height: 50px; background: none; border: none; text-align: center; font-size: 14px; text-align: center;}
.take-order-page .choose-site .go-address:first-child{ border-bottom: 1px solid #08d;}

.take-order-page .choose-time{ margin-top: 10px; padding: 10px; width: 100%; border: 1px solid #ddd; border-radius: 4px; line-height: 30px; }
.take-order-page .icon-arrow-right{ margin: 10px 0 0 10px; float: right;}
.take-order-page .icon-arrow-down{ margin: 10px 0 0 10px; float: right;}
.take-order-page .time{ float: right;}
.take-order-page .time-icon{ float: left; margin: 3px 10px 0 0; width: 24px; height: 24px; border-radius: 50%; line-height: 14px;}
.take-order-page .time-icon span{ margin-left: 5px; display: inline-block; width: 8px; height: 8px; border-right: 2px solid #fff; border-bottom: 2px solid #fff;}
.take-order-page .choose-things{ margin-top: 10px; padding: 10px; width: 100%; border: 1px solid #ddd; border-radius: 4px; line-height: 30px; }
.take-order-page .goods-input{ text-align: right; float: right; width: 80%; height: 30px; border: none; line-height: 30px; }


.take-order-page .choose-weight{ margin-top: 10px; padding: 10px; width: 100%; border: 1px solid #ddd; border-radius: 4px; line-height: 30px; }
.take-order-page .choose-weight .weight{ float: right;}
.take-order-page .choose-weight .weight button{ margin-top: -1px; width: 30px; height: 30px; background: #ddd; border: none; color: #666; font-size: 18px; vertical-align: middle;}
.take-order-page .choose-weight .weight input{ margin: 0 8px; width: 50px; height: 30px; border: 1px solid #ddd; border-radius: 3px; box-shadow: 0 2px 0 #efefef inset; text-align: center;}

.take-order-page .message{ margin-top: 10px; padding: 10px; width: 100%; border: 1px solid #ddd; border-radius: 4px; line-height: 30px; }
.take-order-page .message .message-list{ position: relative; margin: 10px -10px 0 -10px; padding-left: 1%; border-top: 1px solid #ddd;}
.take-order-page .message .message-list span{ display: inline-block; margin: 10px 1.5% 0; width: 30%; height: 30px; border: 1px solid #08d; text-align: center;line-height: 30px;}
.take-order-page .message .message-list span.on{ color: #fff!important; background: #08d;}
.take-order-page .message .message-list textarea{ margin: 10px 2.5% 0 1.5%; padding: 10px; width: 96%; height: 50px;border: 1px solid #ddd; border-radius: 3px; box-shadow: 0 2px 0 #efefef inset;}
.take-order-page .message .message-list .count{ position: absolute; bottom: 5px; right: 3.5%; font-size: 12px; color: #666;}

.take-order-page .dtdFlag{ margin-top: 10px; padding: 10px; width: 100%; border: 1px solid #ddd; border-radius: 4px; line-height: 30px; }
.take-order-page .dtdFlag input{ float: right; margin-top: 10px;}

.take-order-page .xieyi{ margin: 10px 0 40px; text-align: center; color: #666;}
.take-order-page .take-order{ position: fixed; bottom: 0; left: 0; width: 100%; height:40px; border: none; font-size: 14px; color: #fff;}
@import "./../../public/static/plugin/iosselect/iosSelect.css";
</style>
<script>
	import service from '@/services/services'
	import auth from './../utils/auth'
	import IosSelect from './../../public/static/plugin/iosselect/iosSelect.js'

	export default{
		data() {

			return {
				form:{
					customerId:'',
					fromName:'',
					fromContact:'',
					fromProvince:'',
					fromCity:'',
					fromArea:'',
					fromDetailAddr:'',

					toName:'',
					toContact:'',
					toProvince:'',
					toCity:'',
					toArea:'',
					toDetailAddr:'',

					collectStartTime:'',
					collectEndTime:'',
					goods:'',
					weight:1,
					message:'',
					extraInfo:'',

					dtdFlag:0

				},
				timeText:'',

				messageList:[],
				messageFlag:false,

				dtdFlag:false,
				extraNumber:0,
				agree:'agree'
			}
		},
		created () {
			if(auth.getToken('customerId')){
				this.form.customerId=auth.getToken('customerId')
				this.getMessage()
			}
			if(sessionStorage.getItem("toData")){
				var toData = JSON.parse(sessionStorage.getItem("toData"));
				this.form.toName=toData.toName;
				this.form.toContact=toData.toContact;
				this.form.toProvince=toData.toProvince;
				this.form.toCity=toData.toCity;
				this.form.toArea=toData.toArea;
				this.form.toDetailAddr=toData.toDetailAddr;
			}
			if(sessionStorage.getItem("fromData")){
				var fromData = JSON.parse(sessionStorage.getItem("fromData"));
				this.form.fromName=fromData.fromName;
				this.form.fromContact=fromData.fromContact;
				this.form.fromProvince=fromData.fromProvince;
				this.form.fromCity=fromData.fromCity;
				this.form.fromArea=fromData.fromArea;
				this.form.fromDetailAddr=fromData.fromDetailAddr;

				if(this.form.fromProvince!='江西省'){
					alert('目前只有江西省南昌市、吉安市、赣州市、吉安县开通了寄件业务。')
					return;
				}
				if(!(this.form.fromCity=='南昌市'||this.form.fromCity=='吉安市'||this.form.fromCity=='赣州市')){
					alert('目前只有江西省南昌市、吉安市、赣州市、吉安县开通了寄件业务。')
					return;
				}
			}


		},

		watch:{
			form:{
				handler:function(){
					var _this = this;
					_this.extraNumber = _this.$refs.extraInfo.value.length;
				},
				deep:true
			}
		},

		methods: {

			//获取留言
			getMessage() {
				service.messageAll({customerId:this.form.customerId}).then(rs => {

					for(var i=0; i<rs.data.messageList.length; i++){
						this.messageList.push({
							checked:false,
							value:rs.data.messageList[i]
						})
					}
				})
			},

			//选择时间
			chooseTime(){
				var that = this;
				var data = [{'id': '1', 'value': '今天'},{'id': '2', 'value': '明天'},{'id': '3', 'value': '后天'}]
				var data1 = [
					{'id': '9', 'value': '上午'},
					{'id': '10', 'value': '下午'},
				];
				var myDate = new Date();

				var example = new IosSelect(2,[data,data1],{
					title: '上门时间',
					itemHeight: 50,
					itemShowCount: 3,
					oneLevelId: data[0].id,
					twoLevelId: 0,
					callback: function (selectOneObj, selectTwoObj) {
						var time = [];
						var date = '';
						if(selectOneObj.value=='今天'){
							date = myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate()
						}else if(selectOneObj.value=='明天'){
							var nextDate = new Date(myDate.getTime()+86400000);
							date = nextDate.getFullYear()+'-'+(nextDate.getMonth()+1)+'-'+nextDate.getDate()
						}else if(selectOneObj.value=='后天'){
							var nextnextDate = new Date(myDate.getTime()+86400000*2);
							date = nextnextDate.getFullYear()+'-'+(nextnextDate.getMonth()+1)+'-'+nextnextDate.getDate()
						}
						if(selectTwoObj.value=='上午'){
							time = ['09:00:00','12:00:00']
						}else if(selectTwoObj.value=='下午'){
							time = ['14:00:00','18:00:00']
						}

						that.form.collectStartTime = date +' '+time[0];
						that.form.collectEndTime = date +' '+time[1];
						that.timeText = selectOneObj.value + ' ' + selectTwoObj.value
					}
				});
			},

			//重量
			minus(){

				this.form.weight=Number(this.form.weight)-1;
			},
			add(){
				this.form.weight=Number(this.form.weight)+1;
			},

			//选择留言
			openMessage(flag) {
				this.messageFlag=!flag;
			},
			chooseMessage(index){
				if(this.messageList[index].checked){
					this.messageList[index].checked=false;
				}else{
					this.messageList[index].checked=true;
				}

			},


			//下单
			takeOrder(){
				var that =this
				var time = that.form.collectStartTime;
				var fromN = that.form.fromName;
				var toN = that.form.toName;
				var goods = that.form.goods;
				if(time==''){
					alert("请选择上门时间")
				}
				if(fromN==''){
					alert('请输入寄件人信息')
					return;
				}
				if(toN==''){
					alert('请输入收件人信息')
					return;
				}
				if(goods==''){
					alert('请选择物品信息')
					return;
				}
				if(that.agree==''){
					alert('请先阅读并同意服务协议')
					return;
				}

				if(that.form.fromProvince!='江西省'){
					alert('目前只有江西省南昌市、吉安市、赣州市、吉安县开通了寄件业务。')
					return;
				}
				if(!(that.form.fromCity=='南昌市'||that.form.fromCity=='吉安市'||that.form.fromCity=='赣州市')){
					alert('目前只有江西省南昌市、吉安市、赣州市、吉安县开通了寄件业务。')
					return;
				}

					/*fromProvince:'',
					fromCity:'',*/

				if(that.dtdFlag){
					that.form.dtdFlag=1
				}else{
					that.form.dtdFlag=0
				}

				var arr= []
				for(var i=0; i<that.messageList.length;i++){

					if(that.messageList[i].checked){
						arr.push(that.messageList[i].value)
					}
				}
				that.form.message=arr.join(',')


				service.order(that.form).then(rs => {
					if(rs.data.retCode=='000100'){
						sessionStorage.removeItem('fromData');
						sessionStorage.removeItem('toData');
						that.$router.push({
							path: '/order/list'
						})
					}else{
						alert(rs.data.retMsg)
					}


				})
			},


			goAddress(flag){
				this.$router.push({
					path: '/address/add',
					query:{target: flag}
				})
			},

			goAddressList(flag){
				this.$router.push({
					path: '/address/list',
					query:{target: flag}
				})
			}



		}
	}
</script>