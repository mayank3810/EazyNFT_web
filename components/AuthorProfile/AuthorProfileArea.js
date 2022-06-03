import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
const Tabs = dynamic(
	import("react-tabs").then((mod) => mod.Tabs),
	{ ssr: false }
);
import { resetIdCounter, Tab, TabList, TabPanel } from "react-tabs";
resetIdCounter();

const AuthorProfileArea = () => {
	//counter calculation
	const [days, setDays] = useState("");
	const [hours, setHours] = useState("");
	const [minutes, setMinutes] = useState("");
	const [seconds, setSeconds] = useState("");

	const comingSoonTime = () => {
		let endTime = new Date("December 23, 2021 17:00:00 PDT");
		let endTimeParse = Date.parse(endTime) / 1000;
		let now = new Date();
		let nowParse = Date.parse(now) / 1000;
		let timeLeft = endTimeParse - nowParse;
		let countdays = Math.floor(timeLeft / 86400);
		let counthours = Math.floor((timeLeft - countdays * 86400) / 3600);
		let countminutes = Math.floor(
			(timeLeft - countdays * 86400 - counthours * 3600) / 60
		);
		let countseconds = Math.floor(
			timeLeft - countdays * 86400 - counthours * 3600 - countminutes * 60
		);
		if (counthours < "10") {
			counthours = "0" + counthours;
		}
		if (countminutes < "10") {
			countminutes = "0" + countminutes;
		}
		if (countseconds < "10") {
			countseconds = "0" + countseconds;
		}

		setDays(countdays);
		setHours(counthours);
		setMinutes(countminutes);
		setSeconds(countseconds);
	};

	useEffect(() => {
		setInterval(() => {
			comingSoonTime();
		}, 1000);
	}, []);

	return (
		<>
			<div className="author-profile-area pt-100 pb-70">
				<div className="container">
					<div className="row">
						<div className="col-lg-3">
							<div className="author-profile-sidebar  mr-20">
								<div className="author-user">
									{/* <img
										src="../images/author/author-profile.jpg"
										alt="Images"
									/>
									<i className="ri-check-line"></i> */}
								</div>

								<h3>
									<Link href="/author-profile">
										<a>Olivia Jenar</a>
									</Link>
								</h3>
								<span>@Jenar</span>
								<p>
									All the Lorem Ipsum generators on the
									Internet tend to repeat predefined chunks as
									necessary
								</p>
								{/* <div className="sp-title">
									0x76669f...a0e9ca52{" "}
									<i className="ri-folders-line"></i>
								</div> */}
								{/* <div className="author-content">
									<div className="content-left">
										<span>Followers</span>
										<h4>2941</h4>
									</div>

									<div className="content-right">
										Follow
										<ul className="author-social">
											<li>
												<a
													href="https://discord.com/"
													target="_blank" 
													rel="noreferrer"
												>
													<i className="ri-facebook-fill"></i>
												</a>
											</li>
											<li>
												<a
													href="https://www.instagram.com/"
													target="_blank" 
													rel="noreferrer"
												>
													<i className="ri-instagram-fill"></i>
												</a>
											</li>
											<li>
												<a
													href="https://twitter.com/"
													target="_blank" 
													rel="noreferrer"
												>
													<i className="ri-twitter-fill"></i>
												</a>
											</li>
										</ul>
									</div>
								</div> */}
							</div>
						</div>

						<div className="col-lg-9">
							
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AuthorProfileArea;
