<template>
	<div class="take-order-page">
		<div class="title">收件员上门</div>
		<div class="form-div">
			<div class="choose-site">
				<div class="l">
					<div class="p send" @click="goAddress('from')">
						<span class="s">寄</span>
						<div class="text" v-if="form.fromName!=''">
							<span class="n">{{form.fromName}}</span>
							<span class="a">{{form.fromProvince}}{{form.fromCity}}</span>
						</div>
						<div class="text place" v-else>请输入寄件人信息</div>
					</div>
					<div class="p send" @click="goAddress('to')">
						<span class="s base-ba">收</span>
						<div class="text" v-if="form.toName">
							<span class="n">{{form.toName}}</span>
							<span class="a">{{form.toProvince}}{{form.toCity}}</span>
						</div>
						<div class="text place" v-else>请输入收件人信息</div>
					</div>
				</div>
				<div class="r">
					<button class="go-address base-te" @click="goAddressList('from')">地址簿</button>
					<button class="go-address base-te" @click="goAddressList('to')">地址簿</button>
				</div>
			</div>
			<div class="choose-time"  @click="chooseTime()">
				<span class="time-icon base-ba"><span></span></span>
				<i class="icon-arrow-right"></i>
				<span class="time">{{timeText}}</span>
				上门时间
			</div>
			<div class="choose-things">
				<div @click="openGoods(goodsFlag)">
					<i class="icon-arrow-down" v-if="goodsFlag"></i>
					<i class="icon-arrow-right" v-else></i>
					<template v-if="form.goods">{{form.goods}}</template>
					<template v-else>物品</template>
				</div>

				<div class="things-list" v-show="goodsFlag">
					<span class="base-te" v-bind:class="{ on: form.goods==item}" v-for="item in goodsList" @click="chooseGoods(item)">{{item}}</span>
				</div>
			</div>
			<div class="choose-weight">
				<div class="weight">
					<button class="minus" @click="minus()" :disabled="form.weight==1">-</button>
					<input type="text" readonly="readonly" v-model="form.weight" />
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
						<span class="base-te" v-bind:class="{ on: form.message==item}" v-for="item in messageList" @click="chooseMessage(item)">{{item}}</span>
					</div>
					<textarea maxlength="20" v-model="form.extraInfo" ref="extraInfo"></textarea>
					<div class="count">{{extraNumber}}/20</div>
				</div>
			</div>
			<div class="dtdFlag">
				<label>是否送货上门<input type="checkbox" value="1" v-model="dtdFlag" /></label>
			</div>
			<div class="xieyi">
				<label><input type="checkbox" checked value="agree" v-model="agree" /> 我已阅读并同意<a href="" class="base-te">《服务协议》</a></label>
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
.take-order-page .choose-things .things-list{ margin: 10px -10px 0 -10px; padding-left: 1%; border-top: 1px solid #ddd;}
.take-order-page .choose-things .things-list span{ display: inline-block; margin: 10px 1.5% 0; width: 30%; height: 30px; border: 1px solid #08d; text-align: center;line-height: 30px;}
.take-order-page .choose-things .things-list span.on{ color: #fff!important; background: #08d;}
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
				goodsList:[],
				goodsFlag:false,

				messageList:[],
				messageFlag:false,

				dtdFlag:false,
				extraNumber:0,
				agree:'agree'
			}
		},
		created () {
			this.form.customerId=auth.getToken('customerId')
			this.getGoods()
			this.getMessage()

			if(sessionStorage.getItem("fromData")){
				var fromData = JSON.parse(sessionStorage.getItem("fromData"));
				this.form.fromName=fromData.fromName;
				this.form.fromContact=fromData.fromContact;
				this.form.fromProvince=fromData.fromProvince;
				this.form.fromCity=fromData.fromCity;
				this.form.fromArea=fromData.fromArea;
				this.form.fromDetailAddr=fromData.fromDetailAddr;
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

			//获取物品
			getGoods() {
				service.goodsAll({customerId:this.form.customerId}).then(rs => {
					this.goodsList=rs.data.goodsList
				})
			},
			//获取留言
			getMessage() {
				service.messageAll({customerId:this.form.customerId}).then(rs => {
					this.messageList=rs.data.messageList
				})
			},

			//选择时间
			chooseTime(){
				var that = this;
				var data = [{'id': '1', 'value': '今天'},{'id': '2', 'value': '明天'},{'id': '3', 'value': '后天'}]
				var baseTimeData = [
					{'id': '9', 'value': '09:00-10:00'},
					{'id': '10', 'value': '10:00-11:00'},
					{'id': '11', 'value': '11:00-12:00'},
					{'id': '12', 'value': '12:00-13:00'},
					{'id': '13', 'value': '13:00-14:00'},
					{'id': '14', 'value': '14:00-15:00'},
					{'id': '15', 'value': '15:00-16:00'},
					{'id': '16', 'value': '16:00-17:00'},
					{'id': '17', 'value': '17:00-18:00'}
				]

				var myDate = new Date(),
					nowHours = myDate.getHours();
				if(nowHours<9||nowHours>=17){
					data.splice(0,1)
				}

				var data1 = function twoFun(oneLevelId, callback) {
					var arr = [];

					if(oneLevelId=='1'){
						arr = baseTimeData.splice(nowHours-8,nowHours);
					}else{
						arr = baseTimeData;
					}
					callback(arr);
				}

				var example = new IosSelect(2,[data,data1],{
					title: '上门时间',
					itemHeight: 50,
					itemShowCount: 3,
					oneLevelId: data[0].id,
					twoLevelId: 0,
					callback: function (selectOneObj, selectTwoObj) {
						var time = selectTwoObj.value;
						var timeArr = time.split("-");
						var date='';
						if(selectOneObj.value=='今天'){
							date = myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate()
						}else if(selectOneObj.value=='明天'){
							var nextDate = new Date(myDate.getTime()+86400000);

							date = nextDate.getFullYear()+'-'+(nextDate.getMonth()+1)+'-'+nextDate.getDate()
						}else if(selectOneObj.value=='后天'){
							var nextnextDate = new Date(myDate.getTime()+86400000*2);
							date = nextnextDate.getFullYear()+'-'+(nextnextDate.getMonth()+1)+'-'+nextnextDate.getDate()
						}

						that.form.collectStartTime=date +' '+timeArr[0] +':00';
						that.form.collectEndTime=date +' '+timeArr[1] +':00';
						that.timeText= date + ' ' + selectTwoObj.value
					}
				});
			},

			//选择物品
			openGoods(flag) {
				this.goodsFlag=!flag;
			},
			chooseGoods(goods){
				this.form.goods=goods;
				this.goodsFlag=false;
			},

			//重量
			minus(){
				this.form.weight=this.form.weight-1;
			},
			add(){
				this.form.weight=this.form.weight+1;
			},

			//选择留言
			openMessage(flag) {
				this.messageFlag=!flag;
			},
			chooseMessage(message){
				this.form.message=message;
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

				if(that.dtdFlag){
					that.form.dtdFlag=1
				}else{
					that.form.dtdFlag=0
				}
				console.log(this.form)

				service.order(this.form).then(rs => {
					if(rs.data.retCode=='000100'){
						sessionStorage.removeItem('fromData');
						sessionStorage.removeItem('toData');
						this.$router.push({
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