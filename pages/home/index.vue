<template>
	<view>
		<view class="box">
			<view class="cu-bar search bg-white">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" 
						type="text" placeholder="搜一搜" confirm-type="search" style="text-align: center;"></input>
				</view>
			</view>
			<view class="">
				<view scroll-x class="bg-green nav grid col-3 margin-bottom text-center">
					<view class="cu-item padding" :class="'0'==TabCur?'text-white cur':'text-gray'" @tap="tabSelect" data-id="0">
						<view>
							<image :src="'0'==TabCur? '/static/img/selecatget.png' : '/static/img/catget.png' " class='navImg'></image>
						</view>
						<view>
							<text>领养</text>
						</view>
					</view>
					<view class="cu-item padding" :class="'1'==TabCur?'text-white cur':'text-gray'" @tap="tabSelect" data-id="1">
						<view>
							<image :src="'1'==TabCur? '/static/img/seleloser.png' : '/static/img/loser.png' " class='navImg'></image>
						</view>
						<view>
							<text>走失</text>
						</view>
					</view>
					<view class="cu-item padding" :class="'2'==TabCur?'text-white cur':'text-gray'" @tap="tabSelect" data-id="2">
						<view>
							<image :src="'2'==TabCur? '/static/img/seleshow.png' : '/static/img/show.png' " class='navImg'></image> 
						</view>
						<view>
							<text>曝光</text>
						</view>
					</view>
				</view>
			</view>
			<view >
				<sl-filter ref="slFilter" :themeColor="themeColor" :menuList="menuList" @result="result" @statusIdx='statusIdx' :menuColor='menuColor'></sl-filter>
			</view>
			<view class="i-card">
				<view v-for="(item,index) in anmInfoList" :key="index">
					<view  @click="getDataInfo(item,index)">
						<AnimalInfo
							:anmInfo="item"
							:idx="TabCur"
						/>
					</view>
				</view>
			</view>
			<ModalInfo  
				:class="diffArea ? 'show' : '' "
				:anmUrl=tanData.anmUrl 
				:idx="TabCur"
				:diffArea="diffArea"
				@hideModal="hideModal"
			></ModalInfo>
			<modal-user-info
			:class="diffUserArea ? 'show' : '' "
			:idx="TabCur"
			:diffUserArea="diffUserArea"
			@hideModal="hideUserModal"
			></modal-user-info>
		</view>
	</view>
</template>

<script>
	import AnimalInfo from '@/components/common/animal-info.vue'
	import ModalInfo from '@/components/common/modal-info.vue'
	import ModalUserInfo from '@/components/common/modal-user-info.vue'
	import slFilter from '@/components/songlazy-sl-filter/sl-filter/sl-filter.vue';
	export default {
		components:{AnimalInfo,slFilter,ModalInfo,ModalUserInfo},
		data() {
			return {
				selectIdx:'0',
				menuColor:"#666666",
				tanData:{},
				diffArea:false,
				diffUserArea:false,
				showModal:false,
				CustomBar: this.CustomBar,
				TabCur:'0',
				anmInfoList:[],
				anmInfoList0:[
					{
						anmUrl:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
						address:'杭州市滨江区长河街道临江花园',
						nowDate:'2019-04-06',
						anmkind:'橘猫',
						others:'有米'
					},
					{
						anmUrl:'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
						address:'杭州市滨江区浦沿街道联庄地铁口',
						nowDate:'2018-12-06',
						anmkind:'泰迪',
						others:'泰迪'
					},
					{
						anmUrl:'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
						address:'杭州市滨江区长河街道缤纷小区',
						nowDate:'2018-11-04',
						anmkind:'金毛',
						others:'金毛'
					},
					{
						anmUrl:'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
						address:'杭州市滨江区长河街道长江小区',
						nowDate:'2019-06-06',
						anmkind:'松狮',
						others:'松狮'
					}
				],
				anmInfoList1:[
					{
						anmUrl:'http://www.ichong123.com/files/2019/5/17/3/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20190517164359.png',
						address:'杭州市滨江区长河街道碧水豪园',
						nowDate:'2019-04-06',
						anmkind:'橘猫',
						others:'有米'
					},
					{
						anmUrl:'http://www.ichong123.com/files/2019/5/17/202/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20190517164415.png',
						address:'杭州市滨江区浦沿街道之江花园',
						nowDate:'2018-12-06',
						anmkind:'泰迪',
						others:'泰迪'
					},
					{
						anmUrl:'http://www.ichong123.com/files/2016/11/10/182/11.jpg',
						address:'杭州市滨江区长河街道景江苑',
						nowDate:'2018-11-04',
						anmkind:'金毛',
						others:'金毛'
					},
					{
						anmUrl:'http://www.ichong123.com/files/2016/11/15/251/QQlpvyi20161115160616.png',
						address:'杭州市滨江区长河街道长河小区',
						nowDate:'2019-06-06',
						anmkind:'松狮',
						others:'松狮'
					}
				],
				themeColor: '#000000',
                filterResult: '',
                menuList: [{
                        'title': '全部',
                        'detailTitle': '',
                        'isMutiple': false,
                        'key': 'sort',
						'popushow':false,
						'isSort': true,
                        'detailList': []
                    },
                    {
                        'title': '品种',
                        'key': 'sort',
                        'isMutiple': true,
						'isSort': true,
						'popushow':true,
                        'detailTitle': '请选择动物品种(单选)',
                        'detailList': [{
                                'title': '不限',
                                'value': ''
                            },
                            {
                                'title': '猫',
                                'value': 'cat'
                            },
                            {
                                'title': '狗',
                                'value': 'dog'
                            },
                            {
                                'title': '其他',
                                'value': 'other'
                            }
                        ]

                    },
                    {
                        'title': '地点',
                        'key': 'sort',
                        'isMutiple': false,
						'popushow':true,
						'isSort': true,
                        'detailTitle': '请选择（单选）',
                        'detailList': [{
                                'title': '不限',
                                'value': ''
                            },
                            {
                                'title': '1公里',
                                'value': 'test_1'
                            },
                            {
                                'title': '2公里',
                                'value': 'test_2'
                            },
                            {
                                'title': '3公里',
                                'value': 'test_3'
                            },
                        ]
                    },
                    {
                        'title': '时间',
                        'key': 'sort',
                        'isSort': true,
						'popushow':true,
                        'detailList': [{
                                'title': '默认排序',
                                'value': ''
                            },
                            {
                                'title': '一个星期内',
                                'value': 'inweek'
                            },
                            {
                                'title': '一个月内',
                                'value': 'inMonth'
                            },
                            {
                                'title': '三个月内',
                                'value': 'inThreeMonth'
                            },
                            {
                                'title': '半年内',
                                'value': 'inhofHour'
                            }
                        ]
                    }
                ]
			};
		},
		onReady() {
			this.anmInfoList=this.anmInfoList0;
		},
		methods: {
			hideModal() {
				this.diffArea = false;
				this.diffUserArea=true;
			},
			hideUserModal(){
				this.diffUserArea=false;
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				switch(this.TabCur){
					case '0':
						this.anmInfoList=this.anmInfoList0
						break;
					case '1':
						this.anmInfoList=this.anmInfoList1
						break;
					case '2':
						this.anmInfoList=this.anmInfoList0
						break;
				}
				console.log(this.TabCur)
			},
			getDataInfo(item,index){
				console.log(index);
				this.tanData=item;
				if(this.TabCur=='0'){
					this.diffArea=true;
				}else if(this.TabCur=='1'){
					this.diffArea=true;
				}
			},
			statusIdx(idx){
				this.selectIdx=idx;
				 console.log('statusIdx:' + JSON.stringify(idx));
			},
			 result(val) {
                console.log('filter_result:' + JSON.stringify(val));
                this.filterResult = JSON.stringify(val, null, 2)
				this.$refs.slFilter.menuTabClick(this.selectIdx)
				this.menuColor='#39b54a';
            }
		}
	}
</script>

<style scoped lang="scss">
	.textNeed{
		text-align: left;
		margin:30upx;
	}
	
	.cu-list.menu-avatar>.cu-item {
		height:200upx !important;
		background-color:transparent;
	}
	.cu-list.menu-avatar>.cu-item .content {
		left:200upx;
		width:70%;
	}
	.text-cut>input{
		background-color: #fff;
		margin:10upx;
		text-align: left;
	}
	.cu-item{
		height:auto !important;
		margin:0upx !important;
	}z
	.i-card{
		/* position: relative; */
		/* top: -200upx; */
		padding: 0 24upx;
	}
	.navImg{
		width:60upx;
		height:60upx;
		vertical-align: middle;
	}
</style>
