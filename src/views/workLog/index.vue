<template>
    <div v-loading.fullscreen.lock="fullscreenLoading">

        <el-row style="width: 100%px; line-height: 45px; text-align: right; padding-bottom: 5px; font-size: 14px;">
            <el-col :span="8" style="text-align: left;">
                请选择日期：<el-date-picker size="mini" v-model="date" type="date" placeholder="选择日期"></el-date-picker>
            </el-col>
            <el-button size="medium" type="primary" icon="el-icon-search" @click="getList"
                style="margin-right: 10px;">查询</el-button>

            <el-upload style="display: inline;" :beforeUpload="beforeUpload" :on-change="loadFile"
                accept=".xlsx,.xls,.csv" :http-request="uploadFile" action="" :show-file-list='false' ref="upload">
                <el-button size="medium" type="warning" icon="el-icon-upload" @click="importWork">点击导入</el-button>
            </el-upload>
        </el-row>

        <el-row>
            <el-tabs style="height: 200px;" type="card">
                <el-tab-pane v-for="workLog in workLogs " :label="formattedTime(workLog.date, 'YYYY-MM-DD')">
                    <el-row style="line-height: 15px; margin-bottom: 5px; font-size: 14px;">
                        <el-col :span="6">
                            <el-statistic title="收票数" group-separator="," decimal-separator="."
                                :value="workLog.invoiceNum" />
                        </el-col>

                        <el-col :span="6">
                            <el-statistic title="总车数" group-separator="," decimal-separator="."
                                :value="workLog.catCount" />
                        </el-col>

                        <el-col :span="6">
                            <el-statistic title="现结数" group-separator="," decimal-separator="."
                                :value="workLog.cashTermNum" />
                        </el-col>

                        <el-col :span="6">
                            <el-statistic title="收款合计" group-separator="," decimal-separator="."
                                :value="workLog.collectionCount" />
                        </el-col>
                    </el-row>
                    <el-table size="small" class="tableHei" :data="workLog.work_details" style="width: 100%;">
                        <el-table-column type="index" label="序号" width="180">
                        </el-table-column>
                        <el-table-column prop="carCode" label="车牌号">
                        </el-table-column>
                        <el-table-column prop="entranceTime" label="入场时间">
                            <template slot-scope="props">
                                {{ props.row.entranceTime | formattedTime }}
                            </template>
                        </el-table-column>
                        <el-table-column label="结算方式">
                            <el-table-column prop="ticketNum" label="出车票">
                                <template slot-scope="props">
                                    {{ props.row.ticketNum | numToStr }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="cashNum" label="现金">
                                <template slot-scope="props">
                                    {{ props.row.cashNum | numToStr }}
                                </template>
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-row>

        <el-empty description="今日还没有日志数据哦" :visible="emptyVisible"></el-empty>
        <el-dialog title="日志导入" :visible.sync="dialogTableVisible" :close-on-click-modal="false">
            <importPage :workLogs="importWorkLogs" style="" />
            <span slot="footer" class="dialog-footer">
                <el-button size="medium" type="success" icon="el-icon-check" @click="save">保存</el-button>
            </span>
        </el-dialog>

        <el-dialog title="导入失败" :visible.sync="errVisible" :close-on-click-modal="false" custom-class="err-dialog">
            <div style=" background-color: #fef0f0; line-height: 1;">
                <pre style="height: 200px;" v-html="errorInfo"></pre>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeError">我知道了</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import moment from 'moment';
import importPage from './import.vue'
export default {
    components: {
        importPage
    },
    data() {
        return {
            fileList: [],
            workLogs: [],
            importWorkLogs: [],
            dialogTableVisible: false,
            errVisible: false,
            fullscreenLoading: false,
            emptyVisible: true,
            errorInfo: '',
            date: moment(new Date())
        }
    },
    filters: {
        numToStr(num) {
            return num === 0 ? '' : num
        },
        formattedTime(time, str = 'YYYY-MM-DD HH:MM:SS') {
            return moment(time).format(str);
        }
    },
    computed: {

    },
    mounted() {

    },
    methods: {
        closeError() {
            this.errVisible = false
        },
        save() {
            this.$confirm('确定数据无异常，否则会导入失败！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if (this.importWorkLogs.length <= 0) {
                    this.$message({
                        type: 'error',
                        message: '当前页面无数据，请先导入!'
                    });
                    return
                }
                this.fullscreenLoading = true
                this.$axios.post('api/workLog/save', {
                    workLogs: this.importWorkLogs
                }, { timeout: 300000 }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '数据导入成功，请在列表中查询。'
                    });
                    this.dialogTableVisible = false
                    this.fullscreenLoading = false
                }).catch(err => {
                    this.fullscreenLoading = false
                    this.$message({
                        type: 'error',
                        message: '导入失败，请查看错误信息!'
                    });
                    this.errVisible = true
                    this.errorInfo = err.data
                    console.log(err);
                })
            }).catch(() => { });
        },
        importWork() {
        },
        getList() {
            this.fullscreenLoading = true
            this.$axios.post('api/workLog/get', {
                date: moment(this.date).format('YYYY-MM-DD')
            }).then(res => {
                if (res.data.length > 1)
                    this.emptyVisible = false
                this.workLogs = res.data
                this.fullscreenLoading = false
            }).catch(err => {
                this.fullscreenLoading = false
                console.log(err);
            })
        },
        formattedTime(time, str = 'YYYY-MM-DD HH:MM:SS') {
            return moment(time).format(str);
        },
        async uploadFile(params) {
            this.fullscreenLoading = true
            let formData = new FormData();
            formData.append('file', params.file)

            let uploadResult = await this.$axios.post('api/upload/upload', formData);
            this.$axios.post('api/workLog/import', {
                fileUrl: uploadResult.data.path
            }).then(res => {
                this.importWorkLogs = res.data
                this.dialogTableVisible = true
                this.fullscreenLoading = false
            }).catch(err => {
                console.log(err);
            })

        },
        loadFile(file, fileList) {
            this.fileList = fileList
        },
        beforeUpload(file) {

        }
    }
}
</script>
<style>
.err-dialog{
    height: 420px;
}

.err-dialog .el-dialog__body{
    height: 220px;
}
.el-tabs__header {
    margin-bottom: 5px;
}

.el-table--border th.el-table__cell,
.el-table__fixed-right-patch {
    padding: 2px;
}

.el-table th.el-table__cell>.cell {
    text-align: center;
}

.el-dialog__body {
    height: 580px;
}

.el-main {
    line-height: 5px;
}
</style>