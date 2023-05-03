/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable max-len */

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 * Author : Sanjay Krishna S R <sanjaykrishna1203@gmail.com>
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/


const {getRoomDetailsById, updateUserMeetDetails, updateMeetDetailsByID} = require("../lib");

exports.deleteMeet = function(request, response) {
  const roomId = request.body.data.RoomId;
  let result;
  const status = 200;
  const promise = getRoomDetailsById(roomId).then((MeetData) => {
    if (MeetData == undefined) {
      result = {data: {status: "Meet does not exist"}};
    } else {
      const updateMeetDetailsToJson = {
        Status: "DELETED",
      };
      updateMeetDetailsByID(updateMeetDetailsToJson, roomId);
      MeetData.Attendees.forEach((element) => {
        updateUserMeetDetails(element, roomId, updateMeetDetailsToJson);
      });
    }
  }).catch((error) => {
    console.log("Error:", error);
  });

  Promise.resolve(promise).then(() => {
    result = {data: {status: "OK"}};
    console.log("Meet Deleted Successfully");
    return response.status.send(result);
  }).catch((error) => {
    result = {data: error};
    console.error("Error Deleting", error);
    return response.status(status).send(result);
  });
};