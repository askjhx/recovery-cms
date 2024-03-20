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
                <el-button size="medium" type="warning" icon="el-icon-upload">点击导入</el-button>
            </el-upload>
        </el-row>

        <el-row>
            <el-tabs style="height: 200px;" type="card">
                <el-tab-pane v-for="workLog in workLogs " :label="formattedTime(workLog.date, 'YYYY-MM-DD')">
                    <el-table :data="workLog.work_details" style="width: 100%;">
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
                    <el-table style="width: 100%;">

                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-row>
    </div>
</template>

<script>
import moment from 'moment';
export default {
    data() {
        return {
            fileList: [],
            workLogs: [],
            fullscreenLoading: false,
            date: ''
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
        getList() {
            this.fullscreenLoading = true
            this.$axios.post('api/workLog/get', {
                date: moment(this.date).format('YYYY-MM-DD')
            }).then(res => {
                this.workLogs = res.data
                this.fullscreenLoading = false
            }).catch(err => {
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
                this.workLogs = res.data
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
.el-main {
    line-height: 5px;
}
</style>