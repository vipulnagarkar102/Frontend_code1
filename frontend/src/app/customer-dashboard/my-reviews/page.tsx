'use client';

import React, { useState } from "react";
import Sidebar from "../sidebar";
import { Star } from "lucide-react";

interface Review {
  id: number;
  course: string;
  rating: number;
  comment: string;
}

const StarRating = ({ rating }: { rating: number }) => {
  const totalStars = 5;

  return (
    <div className="flex gap-1">
      {[...Array(totalStars)].map((_, index) => {
        const fillColor = index + 1 <= rating ? "#008080" : "#F4F4F4";
        return <Star key={index} size={18} fill={fillColor} color={fillColor} />;
      })}
    </div>
  );
};

const dummyReviews: Review[] = [
  { id: 1, course: "Private: New Course", rating: 4, comment: "Good course" },
  { id: 2, course: "New Course", rating: 5, comment: "Excellent!" },
];

export default function ReviewList() {
  const [reviews, setReviews] = useState<Review[]>(dummyReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [editedComment, setEditedComment] = useState("");

  const openEditModal = (review: Review) => {
    setSelectedReview(review);
    setEditedComment(review.comment);
    setIsModalOpen(true);
  };

  const openDeleteModal = (review: Review) => {
    setSelectedReview(review);
    setIsDeleteModalOpen(true);
  };

  const handleSave = () => {
    setReviews((prev) =>
      prev.map((r) => (r.id === selectedReview?.id ? { ...r, comment: editedComment } : r))
    );
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    setReviews((prev) => prev.filter((r) => r.id !== selectedReview?.id));
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-100 pt-26">
      <Sidebar />
      <div className="p-6 w-full md:ml-64">
        <h2 className="text-2xl font-semibold mb-5">Reviews</h2>

        {/* <div className="flex gap-4 border-b overflow-x-auto">
          <button className="text-lg font-medium text-gray-500">Received (15)</button>
          <button className="text-lg font-medium text-blue-600 border-b-2 border-blue-600">
            Given (35)
          </button>
        </div> */}

        <div className="mt-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-4 rounded-lg shadow mb-4 relative">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg ">Course: {review.course}</h3>
                <div className="flex gap-3">
                  <button onClick={() => openEditModal(review)} className=" cursor-pointer text-[#00A5CF] font-normal text-base">
                    Edit
                  </button>
                  <button onClick={() => openDeleteModal(review)} className="cursor-pointer text-red-600 font-normal text-base">
                    Delete
                  </button>
                </div>
              </div>
              <div className="flex items-center my-2">
                <StarRating rating={review.rating} />
              </div>
              <p className="font-normal text-base mt-5">{review.comment}</p>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-semibold">Edit Comment</h2>
              <textarea
                className="w-full border p-2 rounded mt-2 font-normal text-base"
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
              />
              <div className="flex justify-end gap-2 mt-4 ">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="border border-[#00A5CF] p-2 rounded bg-[#ffffff] text-[#00A5CF] transition duration-200 font-normal text-base cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="ml-3 border border-[#00A5CF] p-2 rounded bg-[#00A5CF] text-white transition duration-200 font-normal text-base cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-semibold">Confirm Deletion</h2>
              <p className="text-gray-600 mt-2">Are you sure you want to delete this review?</p>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
