<template>
    <div>
        <el-tabs style="height: 200px;" type="card">
            <el-tab-pane v-for="workLog in workLogs " :label="formattedTime(workLog.date, 'YYYY-MM-DD')">
                <el-table :data="workLog.detail" style="width: 100%; height: 500px; overflow-y: auto;">
                    <el-table-column type="index" label="序号" width="180">
                    </el-table-column>
                    <el-table-column prop="carCode" label="车牌号">
                    </el-table-column>
                    <el-table-column prop="entranceTime" label="入场时间" width="200">
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
    </div>
</template>

<script>
import moment from 'moment';
export default {
    name: 'importView',
    props: {
        workLogs: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            fileList: [],
            fullscreenLoading: false
        }
    },
    filters: {
        formattedTime(time, str = 'YYYY-MM-DD HH:MM:SS') {
            return moment(time).format(str);
        }
    },
    methods: {
        formattedTime(time, str = 'YYYY-MM-DD HH:MM:SS') {
            return moment(time).format(str);
        },
        created() {
            console.log(this.workLogs);
        },
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
</style>