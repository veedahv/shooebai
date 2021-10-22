<template>
  <div>
    <div class="container lg:max-w-5xl py-5 px-4 mx-auto">
      <h2>Accordion</h2>

      <div class="box w-full">
        <div class="w-full" v-for="(faq, i) in faqs" :key="i">
          <input
            type="checkbox"
            name="accordion-check"
            :id="'accordion-check' + i"
            class="accordion-check hidden"
          />
          <label :for="'accordion-check' + i" class="accordion w-full">{{
            faq.question
          }}</label>
          <div class="panel px-4 py-3">
            <p>
              {{ faq.answer }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      faqs: [
        {
          question: "Section 1",
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
          question: "Section 2",
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
          question: "Section 3",
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
          question: "Section 4",
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
      ],
    };
  },
};
</script>

<style scoped>
.accordion {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  display: inline-block;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  transition: 0.4s;
}

.active,
.accordion:hover {
  background-color: #ccc;
}

.panel {
  padding: 0 18px;
  background-color: #ffffff;
  max-height: 0;
  overflow: hidden;
  transition: max-height 5.2s ease-out;
}
.accordion:after {
  content: "\f067"; /*  character for "plus" sign (+) */
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  font-size: 13px;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  /* color: #777; */
  float: right;
  margin-left: 5px;
  display: inline-flex;
}

.accordion-check:checked + .accordion:after {
  content: "\f068"; /* Unicode character for "minus" sign (-) */
}

.accordion-check:checked + .accordion + .panel {
  /* padding: 0 18px;
  background-color: white; */
  max-height: fit-content;
  /* display: block; */
  /* overflow: hidden;
  transition: max-height 0.2s ease-out; */
}
</style>