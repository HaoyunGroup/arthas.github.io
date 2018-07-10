<template>
  <div style="max-width: 300px;">
    <Cascader :change-on-select="true" @on-change="onChange" :data="addressData" v-model="value"></Cascader>
  </div>
</template>
<script>
  import areaData from 'common/area.js';


  export default {
    name: "AddressSelect",
    data: () => ({
      value: [],
      addressData: []
    }),
    props: ['regionData'],
    created() {
      this.addressData = this.getAreaData();
      this.value = this.regionData;
    },
    methods: {
      getAreaData() {
        let convertedData = areaData.map(item => {
          let province = {
            value: item.areaId,
            label: item.areaName,
          };
          const cityList = item.children.map(city => {
            return {
              value: city.areaId,
              label: city.areaName,
              children: city.children.map(area => {
                return {
                  value: area.areaId,
                  label: area.areaName
                }
              })
            }
          });
          province.children = cityList;
          return province;
        });
        return convertedData;
      },
      onChange(value, selectedData) {
        this.$emit('on-change', selectedData, value);
      }
    }
  }
</script>
<style lang="less" scoped>

</style>
