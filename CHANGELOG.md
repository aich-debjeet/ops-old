# Changelog
All notable changes to this project will be documented in this file.

## [0.9.11] - 2018-10-08
### Added

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
