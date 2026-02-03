/*
 * An "object" representing a 3d vector to make operations simple and concise.
 *
 * Similar to how we work with plain numbers, we will work with vectors as
 * an entity unto itself.  Note the syntax below: var Vector3 = function...
 * This is different than you might be used to in most programming languages.
 * Here, the function is meant to be instantiated rather than called and the
 * instantiation process IS similar to other object oriented languages => new Vector3()
 */

class Vector3 {
    constructor(x, y, z) {
        if (x != null) {
            this.x = x;
        } else {
            this.x = 0;
        }
        if (y != null) {
            this.y = y;
        } else {
            this.y = 0;
        }
        if (z != null) {
            this.z = z;
        } else {
            this.z = 0;
        }
        // todo - make sure to set a default value in case x, y, or z is not passed in
    }

    //----------------------------------------------------------------------------- 
    set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    //----------------------------------------------------------------------------- 
    clone() {
        return new Vector3(this.x, this.y, this.z);
    }

    //----------------------------------------------------------------------------- 
    copy(other) {
        this.x = other.x;
        this.y = other.y;
        this.z = other.z;
        return this;
    }

    //----------------------------------------------------------------------------- 
    negate() {
        this.x *= -1;
        this.y *= -1;
        this.z *= -1;
        return this;
    }

    //----------------------------------------------------------------------------- 
    add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }

    //----------------------------------------------------------------------------- 
    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }

    //----------------------------------------------------------------------------- 
    multiplyScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    }

    //----------------------------------------------------------------------------- 
    length() {
        return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2) + Math.pow(this.z,2));
    }

    //----------------------------------------------------------------------------- 
    lengthSqr() {
        return Math.pow(this.length(),2);
    }

    //----------------------------------------------------------------------------- 
    normalize() {
        var scale = 1/this.length();
        if (scale != 0) {
        this.x *= scale;
        this.y *= scale;
        this.z *= scale;
        }
        return this;

    }

    //----------------------------------------------------------------------------- 
    dot(other) {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }

    //============================================================================= 
    // The functions below must be completed in order to receive an "A"


    //----------------------------------------------------------------------------- 
    rescale(newScale) {
        var scale = newScale/this.length();
        if (scale != 0) {
            this.x *= scale;
            this.y *= scale;
            this.z *= scale;
        }
        return this;
    }

    //----------------------------------------------------------------------------- 
    static fromTo(fromPoint, toPoint) {
        if (!(fromPoint instanceof Vector3) || !(toPoint instanceof Vector3)) {
            console.error("fromTo requires two vectors: 'from' and 'to'");
        }
        this.x = toPoint.x - fromPoint.x;
        this.y = toPoint.y - fromPoint.y;
        this.z = toPoint.z - fromPoint.z;
        return this;

    }

    //----------------------------------------------------------------------------- 
    static angle(v1, v2) {
        return Math.acos(v1.dot(v2) / (Math.sqrt(v1.dot(v1)) * Math.sqrt(v2.dot(v2)))) * (180/Math.PI);
    }

    //----------------------------------------------------------------------------- 
    static project(vectorToProject, otherVector) {
        var newVector = otherVector.clone();
        var angle = Vector3.angle(vectorToProject,otherVector) * (Math.PI/180);
        newVector = newVector.rescale(Math.cos(angle)*vectorToProject.length());
        return newVector;
    }
}
