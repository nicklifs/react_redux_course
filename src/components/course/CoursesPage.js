import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      course: { title: "" }
    };
    //this.onTitleChange = this.onTitleChange.bind(this);
    //this.onClickSave = this.onClickSave.bind(this);
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }

  onTitleChange(event) {
    const course = this.state.course;
    course.title = event.target.value;
    this.setState({course: course});
  }

  onClickSave() {
    //alert(`Saving ${this.state.course.title}`);
      //this.props.dispatch(courseActions.createCourse(this.state.course)); // 1 variant
      //this.props.createCourse(this.state.course);
      this.props.actions.createCourse(this.state.course);
  }

  render() {
    const {courses} = this.props;

    return (
      <div>
        <h1>Courses</h1>
          {/*this.props.courses.map(this.courseRow)*/}
          <CourseList courses={courses}/>

          {/*<h2>Add course</h2>
        <input type="text"
               value={this.state.course.title}
               onChange={this.onTitleChange}/>

        <input type="submit"
               value="Save"
               onClick={this.onClickSave}/>*/}

        <input type="submit"
               value="Add Course"
               className="btn btn-primary"
               onClick={this.redirectToAddCoursePage}/>
      </div>
    );
  }
}


CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  //dispatch: PropTypes.func.isRequired,
  //createCourse: PropTypes.func.isRequired
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
    return {
        //createCourse:  course => dispatch(courseActions.createCourse(course))
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
//export default CoursesPage;
