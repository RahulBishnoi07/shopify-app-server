import sendEmail from "./email-service";
import {getHtmlStringForReviewMail} from "./mjml-templates";



export async function sendReviewEmail({
    receiverName,
    receiverEmail,
    reviewPageUrl,
    productImageUrl,
    productName,
}) {

    let htmlBody = getHtmlStringForReviewMail({
        receiverName,
        reviewPageUrl,
        productImageUrl,
        productName,
    });

    await sendEmail({
        receiverEmail: receiverEmail,
        subject: "You have received a reply to your review",
        htmlBody: htmlBody,
    });
}

