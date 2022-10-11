<script setup>
import { debounce } from 'lodash';
</script>


<template>
  <div>
    <!-- for search -->
    <div class="min-h-screen flex items-center" v-if="responsedata === null">
      <div class=' max-w-md w-full mx-auto'>
        <img class="mx-auto" src="/images/pokemon.png" alt="" width="250">
        <div class="relative flex items-center w-full h-12 rounded-lg shadow-lg bg-white overflow-hidden">
          <div class="grid place-items-center h-full w-12 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <input class="peer h-full w-full outline-none text-sm text-gray-700 pr-2" type="text" id="search"
            placeholder="Find Pokemon.." v-model="searchdata" @keypress="debouceInput" />
        </div>
        <div class="custom-error-message" v-if="error">Species Not Found</div>
      </div>
    </div>

    <!-- for search result -->
    <div class="min-h-screen flex items-center" v-if="responsedata !== null">
      <div class="container mx-auto px-20">
        <div class="border bg-white shadow-xl bg-opacity-25 rounded-lg p-6 text-gray-100 relative z-10"
          style="cursor: auto;">
          <div class="flex flex-wrap items-center">
            <div class="flex w-full h-48 md:h-64 lg:h-72 relative">
              <div class="w-8/12 pr-4 relative">
                <img :src="responsedata.sprites.other.home.front_default"
                  class="w-full h-full object-cover object-top rounded-lg bg-white">
              </div>
              <div class="w-4/12 h-full">
                <div class="flex flex-col w-full h-full">
                  <div class="flex-1 pb-2">
                    <div class="w-full h-full relative">
                      <img :src="responsedata.sprites.front_default"
                        class="absolute top-0 w-full h-full object-cover object-center rounded-lg bg-white">
                    </div>
                  </div>
                  <div class="flex-1 pt-2">
                    <div class="w-full h-full relative">
                      <img :src="responsedata.sprites.back_default"
                        class="absolute top-0 w-full h-full object-cover object-bottom rounded-lg bg-white">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full pt-8 flex flex-col justify-between">
              <div>
                <h2 class="font-bold text-xl text-gray-900">{{responsedata.name}}</h2>
                <div class=" m-0 flex flex-wrap text-center pt-4 mb-2">
                  <p class="m-0 text-xs leading-relaxed text-gray-500 mr-2">Abilities</p>
                  <div class="mr-2 rounded-full px-3 py-1 text-xs bg-green-400 text-green-900"
                    v-for="item in responsedata.abilities">{{item.ability.name}}</div>
                </div>
                <div class=" m-0 flex flex-wrap text-center pt-4 mb-2">
                  <p class="m-0 text-xs leading-relaxed text-gray-500 mr-2">Types</p>
                  <div class="mr-2 rounded-full px-3 py-1 text-xs bg-green-400 text-green-900"
                    v-for="item in responsedata.abilities">{{item.ability.name}}</div>
                </div>
                <p class="text-xs leading-relaxed text-gray-500">There are different Types of moves for each pokemon</p>
                <ul class="text-xs mt-4 list-disc list-inside text-gray-500 leading-relaxed">
                  <li v-for="item in responsedata.moves.slice(0,5)">{{item.move.name}}</li>
                </ul>
              </div>
              <div class="w-full sm:flex-1 grid gap-4 grid-cols-2 pt-6">
                <button @click="responsedata = null"
                  class="w-full block text-center relative text-white font-bold text-sm bg-blue-800 px-4 py-3 rounded-lg shadow-lg hover:shadow-none hover:opacity-75">Back</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
// import { debounce } from lodash;
export default {
  name: 'NuxtTutorial',
  data() {
    return {
      searchdata: "",
      responsedata: null,
      error: false
    }
  },
  methods: {
    debouceInput: debounce(async function (e) {
      if (e.keyCode === 13) {
        try {
          const response = await this.apiCALL('get', this.searchdata.toLowerCase())
          if (response && response.status === 200) {
            console.log(response.data)
            this.responsedata = response.data
          } else {
            this.error = true
            setTimeout(() => {
              this.error = false
            }, 1000)
          }
        } catch (error) {
          if (error) {
            console.log(error.response)
          }
        }
      }
    }, 500),

  },

}
</script>

<style>
.custom-error-message {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: .5rem 1rem .5rem 1rem;
  box-shadow: 5px 5px 10px gray;
  border-radius: 8px;
  margin-left: 1rem;
  margin-bottom: 1rem;
  background-color: red;
  color: white;
}

.container {
  margin-top: 3rem;
  max-width: 45% !important;
}
</style>
