<template>
<div style="background-color: rgb(245, 246, 247);">
    <yz-header></yz-header>
    <div class="page-w">
        <div id="nav">
            <h1>企业服务</h1>
            <h2>提交申请后，我们将安排专员回访确认，为获得更完善的服务，请如实填写您的信息。</h2>
            <h2>通过后我们将为您提供一对一的专业服务，并给您量身定制最合适的套餐和资费。</h2>
        </div>
        <div class="container" style="background-color:#fff;margin-top:-320px;">
            <div class="panel panel-default" style="background-color:#fff;">
                <div class="panel-heading"><span class="title">填写企业信息</span>（
                    <span>*</span>为必填项）</div>
                <div class="panel-body" style="background-color:#fff;">
                    <form class="form-horizontal" enctype="multipart/form-data" @submit.prevent="postform(this)">
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="company_name">企业名称
                                <span>*</span>
                            </label>
                            <div class="col-sm-8">
                                <input v-model="form.company_name" data-rule="required;" class="form-control" type="text" name="company_name" id="company_name" placeholder="请填写企业全称">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="ip_purpose">代理用途
                                <span>*</span>
                            </label>
                            <div class="col-sm-8">
                                <input v-model="form.agent_use" data-rule="required;" class="form-control" type="text" id="ip_purpose" name="ip_purpose" placeholder="例如：爬虫">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="username">联系人姓名
                                <span>*</span>
                            </label>
                            <div class="col-sm-8">
                                <input v-model="form.username" data-rule="required;" class="form-control" type="text" id="username" name="username" placeholder="请填写联系人姓名">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="phone_num">联系人手机
                                <span>*</span>
                            </label>
                            <div class="col-sm-8">
                                <input v-model="form.phone_num" data-rule="required;mobile;" class="form-control" type="text" id="phone_num" name="phone_num" placeholder="请填写联系人手机">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="position">联系人职位</label>
                            <div class="col-sm-8">
                                <input v-model="form.zhiwei" class="form-control" type="text" id="position" name="position" placeholder="请填写联系人职位">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="time_interval">可接听时段</label>
                            <div class="col-sm-8">
                                <!--  <input class="form-control" type="text" id="time_interval" name="time_interval" placeholder="请填写可接听时段">-->
                                <select id="can_call_type" v-model="form.call_call_type">
                                    <option value="1" selected="">工作日</option>
                                    <option value="2">工作日和休息日</option>
                                </select>
                                <select id="can_call_start" v-model="form.call_call_start">
                                    <option value="0">0点</option>
                                    <option value="1">1点</option>
                                    <option value="2">2点</option>
                                    <option value="3">3点</option>
                                    <option value="4">4点</option>
                                    <option value="5">5点</option>
                                    <option value="6">6点</option>
                                    <option value="7">7点</option>
                                    <option value="8">8点</option>
                                    <option value="9" selected="selected">9点</option>
                                    <option value="10">10点</option>
                                    <option value="11">11点</option>
                                    <option value="12">12点</option>
                                    <option value="13">13点</option>
                                    <option value="14">14点</option>
                                    <option value="15">15点</option>
                                    <option value="16">16点</option>
                                    <option value="17">17点</option>
                                    <option value="18">18点</option>
                                    <option value="19">19点</option>
                                    <option value="20">20点</option>
                                    <option value="21">21点</option>
                                    <option value="22">22点</option>
                                    <option value="23">23点</option>
                                </select>
                                至
                                <select id="cal_call_end" v-model="form.call_call_end">
                                    <option value="0">0点</option>
                                    <option value="1">1点</option>
                                    <option value="2">2点</option>
                                    <option value="3">3点</option>
                                    <option value="4">4点</option>
                                    <option value="5">5点</option>
                                    <option value="6">6点</option>
                                    <option value="7">7点</option>
                                    <option value="8">8点</option>
                                    <option value="9">9点</option>
                                    <option value="10">10点</option>
                                    <option value="11">11点</option>
                                    <option value="12">12点</option>
                                    <option value="13">13点</option>
                                    <option value="14">14点</option>
                                    <option value="15">15点</option>
                                    <option value="16">16点</option>
                                    <option value="17">17点</option>
                                    <option value="18" selected="">18点</option>
                                    <option value="19">19点</option>
                                    <option value="20">20点</option>
                                    <option value="21">21点</option>
                                    <option value="22">22点</option>
                                    <option value="23">23点</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="budget">需求量</label>
                            <div class="col-sm-8">
                                <input v-model="form.requirement" class="form-control" type="text" id="budget" name="budget" placeholder="请填写需求量">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="address">所在地</label>
                            <div class="col-sm-8">
                                <input v-model="form.address" class="form-control" type="text" id="address" name="address" placeholder="请填写所在地">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-2">
                                <button type="submit" class="btn btn-primary company_post">提交</button>
                            </div>
                            <div class="col-sm-2 btnres">
                                <button type="reset" class="btn btn-primary" style="background-color: #959595;width:90px;border: 1px solid #959595;">重置</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <yz-footer></yz-footer>
</div>
</template>

<script>
import header from '../http/Head'
import footer from '../http/Footer'
export default {
    name: 'Login',
    components: {
        'yz-header': header,
        'yz-footer': footer
    },
    metaInfo: {
        title: '企业服务_VIP定制-亿洲网络', // set a title
        meta: [{ // set meta
            name: 'Keywords',
            content: '爬虫代理,需求ip量,企业信息'
        }, { // set meta
            name: 'Description',
            content: '企业客户提交申请后，我们将安排专员回访确认，通过后我们将为您提供一对一的专业服务，并根据您的http爬虫等业务需求给您量身定制最合适的代理ip套餐和资费。'
        }]
    },
    data() {
        return {
            form: {
                'type': 2,
                'company_name': '',
                'agent_use': '',
                'username': '',
                'phone_num': '',
                'zhiwei': '',
                'call_call_type': '1',
                'call_call_start': '9',
                'call_call_end': '18',
                'requirement': '',
                'address': '',
                'nickname': '',
            },
        }
    },
    methods: {
        postform: function () {
            this.form.nickname = this.form.username
            this.$http.post('/http/big_data/add', this.$qs.stringify(this.form)).then(
                response => {
                    var res = response.data
                    if (res.state == 1) {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    } else if (res.state == 0) {
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        });
                        this.$router.push('/company')
                    }
                })
        },
    }
}
</script>

<style scoped>
@import url('../../assets/css/bootstrap.min.css');
@import url('../../assets/css/http/company.css');

.form-group .btnres {
    margin-left: 30px;
}

@media screen and (max-width:1024px) {
    .form-horizontal .control-label {
        width: 29.7%
    }

    .container form {
        margin: 50px 0 0 100px;
    }

    .form-group .btnres {
        margin-left: 80px;
    }

    #can_call_type {
        width: 64px;
        font-size: 10px;
    }

    #can_call_start {
        width: 48px;
        font-size: 10px;
    }

    #cal_call_end {
        width: 52px;
        font-size: 10px
    }
}
@media screen and (max-width:768px){
    .page-w{
        height:1280px;
    }
   .form-group  .btnres {
       margin:30px 0 0 30px;

    }
}
</style>
