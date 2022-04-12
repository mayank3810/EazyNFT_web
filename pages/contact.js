import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import Copyright from "../components/Common/Copyright";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";


const Wrapper = styled.div`
	.ez-input, label {
		height: 10px !important;
		font-size: 1rem !important;
		color: #ddd !important;
	}
`;



const Contact = () => {

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");


	const handleName = (e) => {
		setName(e.target.value);
	};

	const handleEmail = (e) => {
		setEmail(e.target.value);
	}; 

	const handleSubject = (e) => {
		setSubject(e.target.value);
	};

	const handleMessage = (e) => {
		setMessage(e.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		var data = JSON.stringify({
			email: email,
			name: name,
			subject: subject,
			message: message,
		});

		var config = {
			method: "post",
			url: `${process.env.NEXT_PUBLIC_API_URL}/general/addContactUsFormApi`,
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		};

		axios(config)
			.then(function (response) {
				toast.success('Message sent', {
					duration: 5,
					type: "success"
				});
			})
			.catch(function (error) {
				toast.error('Message sending failed. Please try again', {
					duration: 5,
					type: "error"
				});
			}).finally(() => {
				setName('');
				setEmail('');
				setMessage('');
				setSubject('');
			});
	};



	return (
		<Wrapper>
			<Navbar />


			<div className="contact-area pt-50 pb-70">
				<div className="container">
					<div className="contact-form pt-50 ">
						<h3>Contact us</h3>
						<form id="contactForm" onSubmit={handleSubmit}>
							<div className="row">
								<div className="col-lg-6">
									<div className="form-group">
										<label>Your Name</label>
										<input
											type="text"
											name="name"
											onChange={handleName}
											value={name}
											id="name"
											className="form-control"
											required
											data-error="Please Enter Your Name"
										/>
										<div className="help-block with-errors"></div>
									</div>
								</div>

								<div className="col-lg-6">
									<div className="form-group">
										<label>Your Email</label>
										<input
											type="email"
											name="email"
											id="email"
											onChange={handleEmail}
											value={email}
											className="form-control"
											required
											data-error="Please Enter Your Email"
										/>
										<div className="help-block with-errors"></div>
									</div>
								</div>

								<div className="col-lg-6">
									<div className="form-group">
										<label>Your Subject</label>
										<input
											type="text"
											name="msg_subject"
											id="msg_subject"
											onChange={handleSubject}
											value={subject}
											className="form-control"
											required
											data-error="Please Enter Your Subject"
										/>
										<div className="help-block with-errors"></div>
									</div>
								</div>

								<div className="col-lg-12 col-md-12">
									<div className="form-group">
										<label>Your Message</label>
										<textarea
											name="message"
											className="form-control"
											id="message"
											onChange={handleMessage}
											value={message}
											cols="30"
											rows="5"
											required
											data-error="Write your message"
										></textarea>
										<div className="help-block with-errors"></div>
									</div>
								</div>

								<div className="col-lg-12 col-md-12">
									<button
										type="submit"
										className="default-btn border-radius-5"
									>
										Send Message{" "}
										<i className="ri-chat-4-line"></i>
									</button>
									<div
										id="msgSubmit"
										className="h3 text-center hidden"
									></div>
									<div className="clearfix"></div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>


			<div className="contact-info-area pb-70">
				<div className="container">


					<div className="row justify-content-center">
						<div className="col-lg-4 col-6">
							<div className="contact-card">
								<i className="ri-map-pin-line"></i>
								<h3>Location</h3>
								<p>Bygmestervej 59B block 2400,</p>
								<p> Copenhagen Denmark</p>
							</div>
						</div>

						<div className="col-lg-4 col-6">
							<div className="contact-card">
								<i className="ri-phone-line"></i>
								<h3>Phone</h3>
								<p>
									<a href="tel:+44012345679782">
										+44 0123 4567 9782
									</a>
								</p>
								<p>
									<a href="tel:+44012345676608">
										+44 0123 4567 6608
									</a>
								</p>
							</div>
						</div>

						<div className="col-lg-4 col-6">
							<div className="contact-card">
								<i className="ri-mail-send-line"></i>
								<h3>Email Address</h3>
								<p>
									<a href="mailto:info@tezor.com">
										info@polyone.com
									</a>
								</p>
								<p>
									<a href="mailto:hello@tezor.com">
										hello@polyone.com
									</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>


			
			<Footer />
			<Copyright />
		</Wrapper>
	);
};

export default Contact;
