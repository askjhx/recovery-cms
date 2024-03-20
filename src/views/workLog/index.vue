<template>
    <div v-loading.fullscreen.lock="fullscreenLoading">
        <el-row style="width: 100%px; line-height: 45px; text-align: right; padding-bottom: 5px; font-size: 14px;">
            <el-col :span="8" style="text-align: left;">
                请选择日期：<el-date-picker size="mini" v-model="date" type="date" placeholder="选择日期"></el-date-picker>
            </el-col>
            <el-button size="medium" type="primary" icon="el-icon-search" @click="getList"
                style="margin-right: 10px;">查询</el-button>

            <el-upload style="display: inline;" :beforeUpload="beforeUpload" :on-change="loadFile" accept=".xlsx,.xls,.csv"
                :http-request="uploadFile" action="" :show-file-list='false' ref="upload">
                <el-button size="medium" type="warning" icon="el-icon-upload" @click="importWork">点击导入</el-button>
            </el-upload>
        </el-row>

        <el-row>
            <el-tabs style="height: 200px;" type="card">
                <el-tab-pane v-for="workLog in workLogs " :label="formattedTime(workLog.date, 'YYYY-MM-DD')">
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
                            </el-table-column>
                            <el-table-column prop="cashNum" label="现金">
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-row>
        <el-dialog title="导入数据" :visible.sync="dialogTableVisible" :close-on-click-modal="false">
            <importPage :workLogs="importWorkLogs" style="" />
            <span slot="footer" class="dialog-footer">
                <el-button size="medium" type="success" icon="el-icon-check" @click="save">保存</el-button>
            </span>
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
            fullscreenLoading: false,
            date: moment(new Date())
        }
    },
    filters: {
        formattedTime(time, str = 'YYYY-MM-DD HH:MM:SS') {
            return moment(time).format(str);
        }
    },
    computed: {

    },
    mounted() {

    },
    methods: {
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
                }, 180000).then(res => {
                    this.$message({
                        type: 'success',
                        message: '数据导入成功，请在列表中查询。'
                    });
                    this.fullscreenLoading = false
                }).catch(err => {
                    this.fullscreenLoading = false
                    this.$message({
                        type: 'error',
                        message: '导入失败，请重试!'
                    });
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
.el-table--border th.el-table__cell, .el-table__fixed-right-patch{
    padding: 2px;
}
.el-table th.el-table__cell>.cell{
    text-align: center;
}
.el-dialog__body {
    height: 580px;
}

.el-main {
    line-height: 5px;
}
</style>