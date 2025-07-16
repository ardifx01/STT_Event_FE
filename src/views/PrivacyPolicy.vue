<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Privacy Policy</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="privacy-container">
        <h1>Sapta Tunas Teknologi Privacy Statement</h1>

        <p>
          Your privacy is important to us. This Privacy Statement explains how
          Sapta Tunas Teknologi collects, processes, uses, and protects your
          personal information from use of our service. Sapta Tunas Teknologi is
          committed to protect your privacy.
        </p>

        <h2>Information We Collect From You</h2>

        <p>
          We will collect your data when you voluntarily provide it to us. For
          example, We collect your personal information when you order, register
          for our event or request information about STT Solutions & Services,
          subscribe to marketing communications, request support, complete our
          feedback form or complete surveys. We also can collect your data from
          offline, for example when you attend our events, telemarketing
          database validated and when you call our helpdesk.
        </p>

        <p>
          The data that We collect from you includes: name, email, phone number,
          address, company name, job title, department. We do collect data from
          your end also when you fill your details in our form ads that you are
          available for us to contact you and share you the best solution that
          you request.
        </p>

        <h2>How We Use Your Information</h2>

        <p>STT uses your personal information for various purposes, such as:</p>

        <ul>
          <li>
            <strong
              >Manage our relationship with you as business partner.</strong
            >
            We will use your data as you contact us including to register you as
            our new customer, and we do manage relationship to stay connected
            for update information, We provide you the information as the
            solution you need.
          </li>
          <li>
            <strong>To process transactions.</strong> To support your request
            and also use your information for administrative purposes, agreement
            or contract with us, delivery and invoicing of your order and
            include the satisfaction survey form about our service to make us
            improve and offers you the better services for next.
          </li>
          <li>
            <strong>Marketing.</strong> Information that we get from you comes
            from online and offline tools and We will use your information to
            share you also about our marketing campaign.
          </li>
          <li>
            <strong>To provide general customer services.</strong> To respond
            easily to customer inquiries, to respond refund request, complaints
            and any help that you need.
          </li>
        </ul>

        <h2>How We Use and Share Your Information</h2>

        <p>
          Sapta Tunas Teknologi uses your personal information and shares it to
          our team for building relationship, contact and offer you our update
          information, new program, new solutions and services, provide you with
          information you may interested in or complete a transaction to your
          purchase or interest in purchasing with us. Your information will help
          us also to improve us and personalize our products and services,
          maintain your account, help you with customer service and technical
          support issues or questions, we use for our research or customer
          analysis also to improve us.
        </p>

        <h2>How We Secure Your Personal Information</h2>

        <p>
          Sapta Tunas Teknologi commits and strives to make it easy for you to
          keep your personal information and help us maintain the accuracy. We
          encourage you to keep any passwords you use confidential and to be
          careful to avoid phishing scams where someone may send you an email
          that appears to be from Sapta Tunas Teknologi asking for your personal
          information. Sapta Tunas Teknologi does not ever request your ID or
          password through email.
        </p>

        <h2>Communication & Subscription Preference</h2>

        <p>
          You have any right to determine what information you want to receive
          from Sapta Tunas Teknologi about our Solutions and Services and how
          that information received by specifying your communications
          preferences. You can receive our information from any tools We have.
          If you want to discontinue our information, you can unsubscribe our
          email in the box that provided.
        </p>

        <p>
          If you choose not to provide more personal information, we may not be
          able to share you any update about our solutions and services. You
          will receive any update information, marketing campaign that we have
          once you subscribe and allow us to send you regularly.
        </p>

        <ion-button
          expand="block"
          @click="closePrivacyPolicy"
          style="color: white"
          >I Understand</ion-button
        >
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from "@ionic/vue";
import { useRouter } from "vue-router";

export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
  },
  setup() {
    const router = useRouter();

    const closePrivacyPolicy = () => {
      router.push("/");
    };

    return {
      closePrivacyPolicy,
    };
  },
};
</script>

<style scoped>
.privacy-container {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: var(--ion-color-primary);
}

h2 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 1.5rem;
  margin-bottom: 0.8rem;
  color: var(--ion-color-primary);
}

p,
li {
  margin-bottom: 1rem;
  line-height: 1.5;
  color: var(--ion-color-dark);
}

ul {
  padding-left: 1.5rem;
}

li {
  margin-bottom: 0.8rem;
}

ion-button {
  margin-top: 2rem;
  margin-bottom: 1rem;
}
</style>