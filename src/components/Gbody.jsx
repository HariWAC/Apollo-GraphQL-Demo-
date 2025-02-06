import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Container, Row, Col } from "react-bootstrap";
import { Form } from "informed";
import {
  validateEmail,
  validateRequired,
  validateName,
  validateMobile,
} from "../utils/validateRequired";
import FormField from "./FormField";
import ContentCard from "./ContactCard";
import "../assets/ContactPage.css";

const GET_CONTACT_PAGE = gql`
  query GetContactPage {
    contactUsPage {
      title
      description
      meta_title
      meta_keywords
      meta_description
      right_side_content {
        type
        name
        street
        city
        id
        link
        link_label
        phone
        email
        socialLinks {
          id
          link
          svg_text
          title
        }
      }
    }
  }
`;

const SUBMIT_CONTACT_FORM = gql`
  mutation SubmitContactForm(
    $request_type: String!
    $email: String!
    $name: String!
    $telephone: String!
    $orderNumber: String
    $comment: String!
    $productSku: String!
  ) {
    submitContactForm(
      input: {
        request_type: $request_type
        email: $email
        name: $name
        telephone: $telephone
        order_number: $orderNumber
        comment: $comment
        product_sku: $productSku
      }
    )
  }
`;

const ContactForm = () => {
  const [submitForm, { loading: submitting }] =
    useMutation(SUBMIT_CONTACT_FORM);

  async function handleFormSubmit(formApi, formState) {
    formApi.validate(); // Ensure validation runs

    if (formState.invalid) {
      return;
    }

    const { values } = formState;

    if (!values.email || !values.name || !values.telephone || !values.comment) {
      return;
    }

    console.log("Submitting form with values:", values);

    await submitForm({
      variables: {
        request_type: "general_inquiry",
        email: values.email,
        name: values.name,
        telephone: values.telephone,
        orderNumber: values.orderNumber || "",
        comment: values.comment,
        productSku: "DEFAULT_SKU",
      },
    });

    formApi.reset({});
  }

  return (
    <Form className="contact-form">
      {({ formApi, formState }) => (
        <>
          <FormField
            label="Name *"
            name="name"
            validate={validateName}
            validateOnChange={true}
            showErrorIfError={true}
          />
          <FormField
            label="Email *"
            name="email"
            validate={validateEmail}
            validateOnChange={true}
            showErrorIfError={true}
          />
          <FormField
            label="Mobile *"
            name="telephone"
            validate={validateMobile}
            validateOnChange={true}
            showErrorIfError={true}
            formatter="mobile"
          />
          <FormField
            label="Order Number"
            name="orderNumber"
            validateOnChange={true}
            showErrorIfError={false}
          />
          <FormField
            label="Message *"
            name="comment"
            validate={validateRequired}
            type="textarea"
            rows="4"
            validateOnChange={true}
            showErrorIfError={true}
          />

          <button
            type="button"
            className="bg-black text-white py-2 px-4 rounded-sm disabled:opacity-20 hover:opacity-80"
            disabled={formState.submitting || submitting}
            onClick={() => handleFormSubmit(formApi, formState)}
          >
            {formState.submitting || submitting ? "Submitting..." : "Submit"}
          </button>
        </>
      )}
    </Form>
  );
};

const Gbody = () => {
  const { loading, error, data } = useQuery(GET_CONTACT_PAGE);

  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (error)
    return <div className="text-center p-5">Error: {error.message}</div>;

  const { contactUsPage } = data;

  return (
    <div style={{ height: "100vh", overflowY: "auto" }}>
      <Container className="contact-container py-5">
        <Row>
          {/* FORM ON THE LEFT - Takes 7 columns */}
          <Col lg={7} className="contact-form-left">
            <h1>{contactUsPage.title}</h1>
            <div
              dangerouslySetInnerHTML={{ __html: contactUsPage.description }}
              className="mb-4"
            />
            <ContactForm />
          </Col>

          {/* CONTACT DETAILS ON THE RIGHT - Takes 5 columns */}
          <Col lg={5} className="contact-info-right">
            {contactUsPage.right_side_content.map((content) => (
              <ContentCard key={content.id} content={content} />
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Gbody;
