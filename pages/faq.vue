<template>
  <div>
    <section class="heading-section">
      <div class="container lg:max-w-5xl py-10 px-4 mx-auto">
        <div class="text-center">
          <div class="heading-box py-8 relative">
            <h2
              class="heading mx-auto text-white py-5 px-1 w-max font-bold text-3xl md:text-4xl"
            >
              <!-- class="heading mx-auto color-light py-5 px-1 w-max font-bold text-5xl" -->
              <!-- ABOUT US -->
              HOW CAN WE HELP?
            </h2>
          </div>
        </div>
      </div>
    </section>
    <section class="faq-main">
      <div class="container lg:max-w-5xl py-5 px-4 mx-auto">
        <div class="container max-w-2xl">
          <p>
            Can't find the answer to your question? Call our help line:
            <a href="tel:+234100566890" class="underline">+234100566890</a>
          </p>
          <div class="box w-full">
            <div class="w-full my-8" v-for="(faq, i) in faqs" :key="i">
              <h3 class="font-medium my-2 text-xl">{{ faq.title }}</h3>
              <div
                class="w-full"
                v-for="(question, index) in faq.questions"
                :key="index"
              >
                <input
                  type="checkbox"
                  name="accordion-check"
                  :id="`accordion-check${i}${index}`"
                  class="accordion-check hidden"
                />
                <label
                  :for="`accordion-check${i}${index}`"
                  class="accordion cursor-pointer inline-block py-3.5 px-6 bg-gray-50 hover:bg-gray-100 text-left w-full"
                >
                  {{ question.question }}
                </label>
                <div class="panel bg-white overflow-hidden px-6">
                  <p class="py-5">
                    {{ question.answer }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
export default {
  data() {
    return {
      faqs: [
        {
          title: "Products",
          questions: [
            {
              question: "How do I make sure I order the right size?",
              answer:
                "You no sabi your shoe size",
            },
            {
              question: "How accurate are the colors?",
              answer:
                "Me sef no sabi",
            },
            {
              question: "Are your shoes original?",
              answer:
                "Wetin I go talk before?",
            },
          ],
        },
        {
          title: "Delivery",
          questions: [
            {
              question: "What is the return policy?",
              answer:
                "We no do return oo",
            },
            {
              question: "How much is your delivery fee?",
              answer:
                "Delivery fee is location dependent",
            },
            {
              question: "What would I do if I never received my order?",
              answer:
                "Omo! E mean say you done enter one chance",
            },
            {
              question: "When will I receive my order?",
              answer:
                "Within 3 to 5 working days",
            },
            {
              question: "Where are you located?",
              answer:
                "Sho_oebai is a remote company",
            },
            {
              question: "Can I make changes to an order I already placed?",
              answer:
                "No boss. Order again",
            },
          ],
        },
        {
          title: "Payments",
          questions: [
            {
              question: "Is there a refund policy?",
              answer:
                "No boss. Once your money enter my hand, e no dey comot.",
            },
            {
              question: "How do I make payments?",
              answer:
                "E no hard like that",
            },
            {
              question: "What are the payment methods?",
              answer:
                "Visa or mastercard",
            },
          ],
        },
        // {
        //   title: "",
        //   questions: [
        //     {
        //       question: "Section 1",
        //       answer:
        //         "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        //     },
        //   ],
        // },
        {
          title: "Your account",
          questions: [
            {
              question: "How do I get a new password?",
              answer:
                "check your profile page",
            },
            {
              question: "Is my information secured?",
              answer:
                "Wetin you dey hide?",
            },
            {
              question: "Can I delete my account?",
              answer:
                "Yeah",
            },
          ],
        },
        {
          title: "Discounts",
          questions: [
            {
              question: "How can I get notified when there is a discount?",
              answer:
                "Subscribe to our newsletter to get notified when there is a discount.",
            },
            {
              question: "How long does your discount last?",
              answer:
                "There is no fixed duration",
            },
            {
              question: "Can I request a discount?",
              answer:
                "Haba Boss. No nauu",
            },
            {
              question: "When is your black friday?",
              answer:
                "We no get.",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.heading-section {
  background: rgba(0, 0, 0, 0.4) url("~/assets/images/faq.jpg") no-repeat bottom
    40% center / cover;
  background-blend-mode: overlay;
}
.faq-main {
  /* background-color: #DFDBE5; */
background-image: url("data:image/svg+xml,%3Csvg width='42' height='44' viewBox='0 0 42 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Page-1' fill='none' fill-rule='evenodd'%3E%3Cg id='brick-wall' fill='%239C92AC' fill-opacity='0.03'%3E%3Cpath d='M0 0h42v44H0V0zm1 1h40v20H1V1zM0 23h20v20H0V23zm22 0h20v20H22V23z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-color: transparent;
  /* background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.09'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); */
}
.accordion {
  /* background-color: #eee; */
  color: #444;
  /* cursor: pointer; */
  /* padding: 18px; */
  /* width: 100%; */
  /* display: inline-block; */
  /* border: none; */
  /* text-align: left; */
  /* outline: none; */
  /* font-size: 15px; */
  transition: 0.4s;
}

/* .active,
.accordion:hover {
  background-color: #ccc;
} */

.panel {
  /* padding: 0 18px; */
  /* background-color: #ffffff; */
  max-height: 0;
  /* overflow: hidden; */
  transition: max-height 0.3s ease-out;
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
  max-height: 600px;
  /* display: block; */
  /* overflow: hidden;
  transition: max-height 0.2s ease-out; */
}
</style>