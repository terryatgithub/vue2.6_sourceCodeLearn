<template>
    <div>
        <h1>{{msg}}</h1>
        <Parent :pa1=obj pa2='pa21111' pa3='pa3333333' @pa="onPa" />
    </div>
</template>

<script>
import  Parent from './Parent'

    export default {
        components: {
            Parent,
        },
        data() {
            return {
                msg: 'grandpa',
                obj: {
                    a: 1,
                    b: 'bbb',
                    c: {
                        cc: 1,
                        cd: 'cdcd'
                    }
                }
            }
        },
        methods: {
            onPa() {
                console.log('grandpa: onPa');
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>