# Changelog
All notable changes to this project will be documented in this file.

### [0.9.13] - 27 Nov, 2018
### Added
- Add: Bookmark module and default component
- Shared redux for report modal
- Invite for signup
- Redux: For removing cover and profile images
- Profile image remove option
- Cover image remove option
- Add: Bookmark tab containers
- Add: All bookmarks with routing config
- Bookmark cards development Profile, Opportunity, event, Image, Audio, Video etc
- Add: Bookmark media modal
- Add: Bookmark profile tab Follow/Unfollow

### Updated/Improved
- Settings: Field valiation improvements, code clean ups, otp for number under progress
- Settings: Otp modal update
- Update: Deployment scripts
- HTML, SCSS, TypeScript formatting
- Report modal improved
- Cleanup: Unused code
- Community report modal
- Update: SCSS linked to parent
- Profile set check changed to Handle from Name 
- Add/Delete my story improved
- UI improvements

### Fixed
- Fix: Footer spacing
- Fix: OPS-2004
- Media spot counts
- Media comment count
- Fix: OPS-2167
- Fix: OPS-2168

### removed
- Username edit option
- Network tab from profile



### [0.9.13] - 07 Nov, 2018
### Added
- OPS-2085 Audio files in the feeds should be autoplay
- Helper function to get the current time
- Redux for media view count
- View count for media on home and profile page

### Updated/Improved
- Media player improvements
- Media selector improvements
- Education privacy settings
- Media upload: Description won't be disabled
- OPS-2088 Adding description to the media before the uploading is completed
- Opportunity: Single file upload label update
- Redux for removing opportunity form attachments
- OPS-916 Setting: "You should be above 13" error validation message shouldn't show to DOB: "15-05-2004"
- Helper function to validate the date and calculate the age
- Media modal comment alignment
- Improvement: Script update for dist bundle report
- Cleanup: All action classes
- Cleanup: Removing unused redux
- Cleanup: All effect classes
- Cleanup: Models

### Fixed
- OPS-2012 About_award: Previously opened window's data is displaying in a freshly opened window
- OPS-1985 About: Just now added "Work/award" is not displaying "Public/private" data on placeholder if the user comes for the second time on update pop up  
- OPS-1934 About_Work: If a user selects "Currently working here" option while adding work "Add" button will not function
- OPS-1610 Award: Before entering date only "Time period" field is displaying "Invalid date" error message
- OPS-2094 Login page scrollbar issue 
- OPS-2106 About: Under Work, award, education "Public/ private" dropdown is not functioning
- OPS-2021 About_bio: There is a time delay while saving edited data under "About_Bio" tab
- OPS-1986 About: Two pages are displaying simultaneously under the "About" tab
- OPS-2049 Setting: User should have provision to edit the e-mail id under the setting
- OPS-2047 settings: "Username is required"  and "Username length limit is 3 to 15 characters" for the mentioned scenario
- OPS-2049 Setting: User should have provision to edit the e-mail id under the setting
- OPS-2046 Setting: Old username shouldn't show for the below-mentioned scenario (Profile which has changed username twice)
- OPS-2041 Settings: User shouldn't get an error message for the below-mentioned scenario
- OPS-2039 Settings: User experience of the selecting gender is not good 
- OPS-2038 setting: Error validation message should be displayed in red color
- OPS-1571 Work/award/education: When user add new work success message should be displayed as " " Your work has been added successfully"
- OPS-258 "Private work-details" should not be shown to another Login user
- OPS-166 User unable to add an image under Profile About "Work" pop-up
- OPS-212 The Placement of "Delete/Edit" icons it is slowing down when a user enters Lengthy text for the title 
- OPS-171 "Success deleted message" is not  displaying under "Award" tab
- Fix: Following/Follower modal user card UI issues
- OPS-1953 Opportunity: UI of the add collaborator is incorrect on the project form
- OPS-599 Settings: "Public/Private" drop-down list is not showing on "Date of Birth", "Mobile number" and "e-mail" field under "General settings".
- OPS-1413 Opportunity: Rich text editor for description fields needs to be updated
- Notification message copy update
- OPS-2088 Adding description to the media before the uploading is completed
- OPS-1962 The error message under the phone number is getting broken at the end of the line this issue is present throughout the website
- OPS-2124 Settings: User should not be allowed to enter text on the mobile number field 
- OPS-2040 Settings: User should get an error validation message for the mentioned date format 
- OPS-870 Password change: User should get appropriate validation message if the user enters the wrong current password

### removed
- Component level Automated test files
- OPS-2125 Opportunity: Change multiple media upload to single
- Media modal: Media type check removed lib




### [0.9.12] - 2018-10-24
### Added
- Helper function added to check if the string is JSON or not
- Private icon added
- Trigger scroll chat window from navigation component
- Event listener service to trigger/listen to events throughout the app
- Navigate the user to the conversation
- Appear directive created to check if media has reached into to viewport
- Video autoplay on scrolling to the specific video
- Added progress bar to the top to show the progress of page load
- OPS-2075: Added departed event to the "appear" directory helper class

### Updated/Improved
- Signup modals 'app-modal' and 'app-modal-new' UI match
- Signup add skills search loading indications improved and set focus to the input on DOM ready
- Events widget added a preloader and destroying subscriptions on component destroy
- Notification module improvement, added reusable function to display the notification
- Thumbnail updated community leave page
- Reduced audio post height
- Profile page UI improvements
- Preloader UI bottom spacing
- Communities search icon updated
- Cursor pointer media popup
- Message module restructured and all respective links updated accordingly
- Video controls: Added auto hide
- Media type check functionality improved
- Viewport will listen to the media type video only
- Home timeline video media click to open and controls added to the timeline video
- Disabling unused observables from the post and channel components
- Fallback profile image has been added to the search people
- OPS-2076: Update home video tracking event for the departure of the element to stop playing the video
- OPS-2081: Video auto-play implement on users activity feed as well
- OPS-2082: Home/Profile timeline video: Play only one at once
- UI corrections across multiple modules
 
### Fixed
- OPS-1872: Post Count is not decreasing after deleting the media under Community
- OPS-1906: OTP modal: Country flag drop down should be clickable on OTP modal
- Login multi-type error response handling
- Trending post issue fixed
- Comment load issue fixed
- OPS-2051: Media pop up: Posted comment is displaying 2 times AM/PM under media pop
- OPS-2053: Notification: Socket notification + normal notification duplication issue
- Channel inner page alignment issue
- OPS-2057: Pusher live notification not showing for messages
- Comment delay
- OPS-2054: Message: Socket message notification + normal message notification duplication issue
- Homepage right block text broken issue
- People to follow scrolling issue fix
- OPS-2036: Homepage: Because of lengthy description home page is creating a horizontal scroll bar
- Media upload page: If a user clicks on Publish button multiple times, Same media will repeat under channel inner page
- Mozilla firefox comment edit issue
- Comment update on media update also
- OPS-1545: Home page: "OPPORTUNITIES FOR YOU" section UI is incorrect if a user enters lengthy text
- OPS-1528: Opportunity: User unable to "reach out" the applicatint
- Comment repeat issue fixed
- OPS-2065: Opportunity inner page: Collaborators widget is should be shown in the opp type project
- Profile page Following/Followers modal follow button was not getting updated
- OPS-718: Messages: If a user gets a new message that should be shown on the top of the "User message list".
- OPS-2058: Notification: UI of the profile image on the notification pop-up is incorrect
- Nomenclature for the video player component
- OPS-1852: Explore page: If user navigate from the explore page and try to slide media's, at a time 2 images are displaying on media modal (Inconsistent issue)
- OPS-1851: Media modal: If user navigate from the explore page sometimes multiple spot icons are displaying on media modal
- OPS-1845: Explore: Sometimes explore page is not displaying properly, an unwanted horizontal scrollbar is displaying
- OPS-1821: Search page: Sometimes search page is displaying multiple search icon & loading icon as well 
- OPS-1818: Explore: Sometimes while scrolling the "Profile" tab is displaying channels & vice versa under "Explore" page
- OPS-1764: Explore: Multiple loading icons are displaying on explore page when user scroll down the page under post tab
- OPS-2001: Preloader: Preloader appear on top of the page after loading all the post it is an inconsistent issue
- OPS-1816: Explore: While scrolling explore page sometimes top navigation bar is displaying little bit down
- OPS-2006: Reset password page content update
- OPS-2044: Content correction
- OPS-2007: Check your phone page content update
- OPS-2005: Registration page OTP popup content update
- OPS- 489: Media upload: User unable to identify the Private and public channel in the list of channel
- OPS-2052: Other's profile_channel inner page: User is already following profile even though channel inner page is displaying "follow" button once again
- OPS-1737: Profile Image upload Popup closes immediately without waiting for backend response
 
### removed
- Hiding message delivery status
- Removing message component bcoz it is adding up 110kb to the navigation module size

## [0.9.11] - 2018-10-08
### Added
- Signup: Added API error response handler to display the message in case of failure.
- Signup: Enabling signup button after error so that user can make the correction and submit the form again.

### Changed
- Video player Refoctor of media popup
- Vender file exclude fron main bundle(Loading Fast)
- Media spot function  refactoring
    - Channel inner page card
    - Media Popup
    - Trending Post
    - Home page Feed
    - Profile page Feed
    - Community page
-

### Fixed
- The error message under the phone number is getting broken at the end of the line this issue is present throughout the website.
- OTP Modal foe settings should be consisting of only one box
- Media upload page: Error message "Missing description" UI is not proper
- Channel: If user deletes any channel while displaying success message there some UI issue
- Media upload page: Media upload page is displaying lengthy channel name as it is (not showing more icon for lengthy channel name)
- UI design under Community Search bar broken
- Setting: User should get appropriate error validation message if user enters invalid e-mail id on e-mail field.
- Settings: "Weak password! Please use special char, numbers and capital letters" should be changed to "Password should contain atleast 5 alphanumeric characters".
- Password change: User should get appropriate validation message if user enters wrong current password.
- when a user clicks "See_More" under Setting, directly it navigates to Home Page.
- Clicking upon enter button given data should get update under the setting
- Settings: In change password, each and every field is showing "error message"
- OPS-2008 Update password page update
- Signup: Preloader overlapping signup button issue fixed
- Message: Cleanup and improvements
- Message: Fixed Duplication of messanger list elements (conversation conflict with the messanger user listing)
- Message: Main navigation Message notification UI improvement
- Comment: Text word break issue fixed
- Notification: Main navigation Message pusher Notification issue fixed and UI improvement
- OPS-1900 Landing page: Text alignment of application not matching with the HTML design
- OPS-1956 Opportunity: User unable to see the collaborator name on the edit form
- OPS-2009 Media popup: Media pop up should have "full screen" option to maximize video
- OPS-1741 Explore: On explore page "category block" is displaying same image twice 
- OPS-1997 Message: ERROR TypeError: Cannot read property 'bind' of undefined

## [0.9.10] - 2018-10-01

### Added
- Profile page: By default "Bio" tab should highlight when user navigate to the about section
- Mobile view auto zoom disable
- User mouse hover channel name it should be displayed hand mark on media popup
- Preloader for following modal
- Search: Set cursor to the search input field
- Search page start on top
- Explore page media delete

### Fixed
- User Comment edited date update
- Slider next button is not functioning under video popup modal
- Email share link redriect to twitter issue
- User profile image upload not properly in mobile
- Search input box alignment broken on mobile
- Border outline is not visible in mobile
- Opportunity form Gender radio buttons are not aligned
- Edit cover image: User unable to see the edit cover image on the "edit cover image modal"
- Pagination added to followers/followings modal
- Search: Showing "No filter available" even if filter exists
- Limiting portfolio categories to 5 max
- Entire page becomes empty when user clicks exit icon in Portfolio
- Portfolio: User able to see that error message, which was appeared in last time
- Profile image: Profile image pop up is displaying unwanted scroll bar
- Search page: User unable to delete the media content under search page

## [0.9.9] - 2018-09-24

### Removed
- Community post card channel name

### Fixed
- Profile page scrolling media post repeat issue
- Comment redux empty issue
- Cover image quailty incresed
- Audio player play button css override on next button

### Added
- Community inivite people can search
- Community leave popup search user
- Media type icon on media post home page trending
- Character limit title and description community add form and edit form
- Slider progress bar event page
- On media Spot count update without refersh (home and profile page)
- Channel inner page contributor user redirection
- Channel delete confirm message 
