<template>
  <div>
    <div class="container lg:max-w-5xl py-5 px-4 mx-auto">
      <div>
        <div class="sub-heading-box py-4 relative">
          <h2 class="sub-heading py-2 font-bold text-2xl relative">
            Privacy Policy
          </h2>
        </div>
        <!-- <h1>Privacy Policy for Shooebai</h1> -->
        <section class="info-main" v-for="(policy, i) in policies" :key="i">
          <div class="container py-5 mx-auto">
            <div class="">
              <div class="sub-heading-box relative">
                <h3 class="sub-heading py-2 font-bold text-xl relative">
                  {{ policy.title }}
                </h3>
              </div>
              <div class="">
                <div class="" v-for="(body, i) in policy.body" :key="i">
                  <div class="mb-4" v-html="body">
                    <!-- <p class="mb-4" v-html="body"> -->
                    <!-- <p class="mb-4"> -->
                    <!-- {{{ body }}} -->
                    <!-- </p> -->
                  </div>
                </div>
                <ul class="mb-4">
                  <div class="" v-for="(list, i) in policy.list" :key="i">
                    <li class="mb" v-html="list">
                      <!-- <div class="mb-4" v-html="list"> -->
                      <!-- {{{ body }}} -->
                      <!-- </div> -->
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </section>
            <!-- <div class="text-center">
            </div> -->
      </div>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      policies: [
        {
          title: "",
          body: [
            `At Shooebai, accessible from Shooebai.netlify.app , one of our main
          priorities is the privacy of our visitors. This Privacy Policy
          document contains types of information that is collected and recorded
          by Shooebai and how we use it.`,
            `If you have additional questions or require more information about our
          Privacy Policy, do not hesitate to contact us.`,
            `This Privacy Policy applies only to our online activities and is valid
          for visitors to our website with regards to the information that they
          shared and/or collected in Shooebai. This policy is not applicable to
          any information collected offline or via channels other than this
          website. Our Privacy Policy was created with the help of the
          <a href="https://www.privacypolicygenerator.info"
            >Free Privacy Policy Generator</a
          >.`,
          ],
          list: [],
        },
        {
          title: "Consent",
          body: [
            `By using our website, you hereby consent to our Privacy Policy and
          agree to its terms.`,
          ],
          list: [],
        },
        {
          title: "We are committed to protecting your privacy",
          body: [
            "We collect the minimum amount of information about you that is commensurate with providing you with a satisfactory service. This policy indicates the type of processes that may result in data being collected about you. Your use of this website gives us the right to collect that information.",
          ],
          list: [],
        },
        {
          title: "Information we collect",
          body: [
            `
          The personal information that you are asked to provide, and the
          reasons why you are asked to provide it, will be made clear to you at
          the point we ask you to provide your personal information.
        `,
            `
          If you contact us directly, we may receive additional information
          about you such as your name, email address, phone number, the contents
          of the message and/or attachments you may send us, and any other
          information you may choose to provide.
        `,
            `
          When you register for an Account, we may ask for your contact
          information, including items such as name, company name, address,
          email address, and telephone number.
        `,
            ``,
          ],
          list: [],
        },
        {
          title: "How we use your information",
          body: [
            `
        We use the information we collect in various ways, including to:
        `,
          ],
          list: [
            `
          Provide, operate, and maintain our website
        `,
            `
          Improve, personalize, and expand our website
        `,
            `
          Understand and analyze how you use our website
        `,
            `
        Develop new products, services, features, and functionality
        `,
            `
            Communicate with you, either directly or through one of our
            partners, including for customer service, to provide you with
            updates and other information relating to the website, and for
            marketing and promotional purposes
        `,
            `
          Send you emails
        `,
            `
          Find and prevent fraud
        `,
          ],
        },
        {
          title: "Log Files",
          body: [
            `
          Shooebai follows a standard procedure of using log files. These files
          log visitors when they visit websites. All hosting companies do this
          and a part of hosting services' analytics. The information collected
          by log files include internet protocol (IP) addresses, browser type,
          Internet Service Provider (ISP), date and time stamp, referring/exit
          pages, and possibly the number of clicks. These are not linked to any
          information that is personally identifiable. The purpose of the
          information is for analyzing trends, administering the site, tracking
          users' movement on the website, and gathering demographic information.
        `,
          ],
          list: [],
        },
        {
          title: "Cookies and Web Beacons",
          body: [
            `
          Like any other website, Shooebai uses 'cookies'. These cookies are
          used to store information including visitors' preferences, and the
          pages on the website that the visitor accessed or visited. The
          information is used to optimize the users' experience by customizing
          our web page content based on visitors' browser type and/or other
          information.
`,
            `
          For more general information on cookies, please read
          <a href="https://www.generateprivacypolicy.com/#cookies"
            >"Cookies" article from the Privacy Policy Generator</a
          >.
`,
          ],
          list: [],
        },
        {
          title: "Advertising Partners Privacy Policies",
          body: [
            `
        You may consult this list to find the Privacy Policy for each of the
          advertising partners of Shooebai.
`,
            `
          Third-party ad servers or ad networks uses technologies like cookies,
          JavaScript, or Web Beacons that are used in their respective
          advertisements and links that appear on Shooebai, which are sent
          directly to users' browser. They automatically receive your IP address
          when this occurs. These technologies are used to measure the
          effectiveness of their advertising campaigns and/or to personalize the
          advertising content that you see on websites that you visit.
`,
            `
          Note that Shooebai has no access to or control over these cookies that
          are used by third-party advertisers.
`,
          ],
          list: [],
        },
        {
          title: "Third Party Privacy Policies",
          body: [
            `
          Shooebai's Privacy Policy does not apply to other advertisers or
          websites. Thus, we are advising you to consult the respective Privacy
          Policies of these third-party ad servers for more detailed
          information. It may include their practices and instructions about how
          to opt-out of certain options.
`,
            `
          You can choose to disable cookies through your individual browser
          options. To know more detailed information about cookie management
          with specific web browsers, it can be found at the browsers'
          respective websites.
`,
          ],
          list: [],
        },
        {
          title: "CCPA Privacy Rights (Do Not Sell My Personal Information)",
          body: [
            ` 
          Under the CCPA, among other rights, California consumers have the
          right to:
`,
            ` 
          Request that a business that collects a consumer's personal data
          disclose the categories and specific pieces of personal data that a
          business has collected about consumers.
`,
            ` 
          Request that a business delete any personal data about the consumer
          that a business has collected.
`,
            ` 
          Request that a business that sells a consumer's personal data, not
          sell the consumer's personal data.
`,
            ` 
          If you make a request, we have one month to respond to you. If you
          would like to exercise any of these rights, please contact us.
`,
          ],
          list: [],
        },
        {
          title: "GDPR Data Protection Rights",
          body: [
            `
          We would like to make sure you are fully aware of all of your data
          protection rights. Every user is entitled to the following:`,
            `
          The right to access – You have the right to request copies of your
          personal data. We may charge you a small fee for this service.
          `,
            `
          The right to rectification – You have the right to request that we
          correct any information you believe is inaccurate. You also have the
          right to request that we complete the information you believe is
          incomplete.`,
            `
          The right to erasure – You have the right to request that we erase
          your personal data, under certain conditions.`,
            `
          The right to restrict processing – You have the right to request that
          we restrict the processing of your personal data, under certain
          conditions.`,
            `
          The right to object to processing – You have the right to object to
          our processing of your personal data, under certain conditions.
        `,
            `
          The right to object to processing – You have the right to object to
          our processing of your personal data, under certain conditions.
          `,
            `
          If you make a request, we have one month to respond to you. If you
          would like to exercise any of these rights, please contact us.
        `,
          ],
          list: [],
        },
        {
          title: "Children's Information",
          body: [
            `
          Another part of our priority is adding protection for children while
          using the internet. We encourage parents and guardians to observe,
          participate in, and/or monitor and guide their online activity.
`,
            `
          Shooebai does not knowingly collect any Personal Identifiable
          Information from children under the age of 13. If you think that your
          child provided this kind of information on our website, we strongly
          encourage you to contact us immediately and we will do our best
          efforts to promptly remove such information from our records.
`,
          ],
          list: [],
        },
        {
          title: "",
          body: [``],
          list: [],
        },
        {
          title: "",
          body: [""],
          list: [],
        },
      ],
    };
  },
};
</script>


<style scoped>
.productImgBox {
  max-width: 400px;
}
.productImgBox img {
  width: 100%;
}
ul {
  list-style-type: disc;
  list-style-position: outside;
  margin-left: 20px;
  line-height: 1.8;
}
</style>