/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51T5LPE06nUVWz21fZhkWk5qalwMP6hD8zkdLJqu0Z3ysAu2D3tym6gd09Vmz4eOOhENf2U1YmF14bjG4LTwRjXvx00j7ofwaNK',
);

exports.bookTour = async (tourId) => {
  try {
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
    );

    console.log(session);

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
