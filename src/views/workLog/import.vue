<template>
    <!-- <el-button size="medium" type="success" icon="el-icon-check" @click="save">保存</el-button> -->
    <el-tabs style="height: 200px;" type="card">
        <el-tab-pane v-for="workLog in workLogs " :label="formattedTime(workLog.date, 'YYYY-MM-DD')">
            <el-table :data="workLog.detail" style="width: 100%;">
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
</template>

<script>
export default {
    data() {
        return {
            fileList: [],
            workLogs: [],
            fullscreenLoading: false
        }
    },
    filters: {
        formattedTime(time, str = 'YYYY-MM-DD HH:MM:SS') {
            return moment(time).format(str);
        }
    },
    methods: {
        save() {
            this.$confirm('确定数据无异常，否则会导入失败！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if (this.workLogs.length <= 0) {
                    this.$message({
                        type: 'error',
                        message: '当前页面无数据，请先导入!'
                    });
                    return
                }
                this.fullscreenLoading = true
                this.$axios.post('api/workLog/save', {
                    workLogs: this.workLogs
                }, 180000).then(res => {
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
    }
}
</script>