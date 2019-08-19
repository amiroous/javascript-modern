# Modern JavaScript Design Patterns
- [Concepts](concepts.md)

> A design pattern is a term used in software engineering for a general reusable solution to a commonly occurring problem in software design

### JavaScript Design Patterns By Category

#### Creational Design Patterns
- [Constructor](constructor.js)
- [Factory](factory.js)
- [Prototype](prototype.js)
- [Singleton](singleton.js)

#### Structural Design Patterns
- [Adapter](adapter.js)
- [Composite](composite.js)
- [Decorator](decorator.js)
- [Facade](facade.js)
- [Flyweight](flyweight.js)
- [Proxy](proxy.js)

#### Behavioral Design Patterns
- [Chain of Responsibility](chain-of-responsibility.js)
- [Command](command.js)
- [Iterator](iterator.js)
- [Mediator](mediator.js)
- [Observer](observer.js)
- [State](state.js)
- [Strategy](strategy.js)
- [Template](template.js)



### Creational Design Patterns
> ##### Creational patterns are for handling object creational mechanisms.
> ###### solves a problem by controlling the creation process of an object.

- #### [Constructor](constructor.js)
    - Class-based creational design pattern
    - Constructors are special functions that can be used to instantiate new objects with methods and properties defined by that function.
    - Most commonly used patterns in JavaScript for creating new objects of a given kind
    

- #### [Factory](factory.js)
    - Another class-based creational pattern
    - Provides a generic interface that delegates the responsibility of object instantiation to its subclasses.
    - Frequently used when we need to manage or manipulate collections of objects that are different yet have many similar characteristics.
    
- #### [Prototype](prototype.js)
    - Object-based creational design pattern
    - It utilizes prototypal inheritance instead of a classic object-oriented inheritance, therefore it plays to JavaScript’s strength and has native support
    - Uses a sort of a “skeleton” of an existing object to create or instantiate new objects
    - The Object.create() method creates a new object, using an existing object as the prototype of the newly created object
    

- #### [Singleton](singleton.js)
    - A Singleton is an object which can only be instantiated only once
    - A Singleton pattern creates a new instance of a class if one doesn’t exist. If an instance exists, it simply returns a reference to that object. Any repeated calls to the constructor would always fetch the same object.
    

### Structural Design Patterns
> ##### Structural Design Patterns are for handling class and object composition.
> ###### they help obtain new functionalities without tampering with the existing ones.

- #### [Adapter](adapter.js)
    - The Adapter pattern translates one interface (an object's properties and methods) to another.
    - The Adapter pattern is also referred to as the Wrapper Pattern.
    - It allows the interface of an existing class to be used from another interface. 
    - It is often used to make existing classes work with others without modifying their source code.
    
    
- #### [Composite](composite.js)
    - The Composite pattern describes a group of objects that can be treated in the same way a single instance of an object may be.
    - The composite pattern consists of components, leaves, and composites. 
    - A component is an abstract class which can be used as either a leaf object or a composite object. It contains methods for managing child objects like add, remove and getChild and methods specific to all components.
    - A composite is a subclass of a component that stores child components and defines the behavior for operating on objects that have children.
    - A leaf is a subclass of a component that has no child objects and defines behavior for an individual object.
    - JavaScript frameworks like React and Vue use the composite pattern to build user interfaces.
    
- #### [Decorator](decorator.js)
    - The Decorator pattern focuses on the ability to add behaviour or functionalities to existing classes dynamically.
    - The Decorator type behaviour is very easy to implement in JavaScript because JavaScript allows us to add methods and properties to object dynamically.
    - [Exploring EcmaScript Decorators](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841)
    

- #### [Facade](facade.js)
- #### [Flyweight](flyweight.js)
- #### [Proxy](proxy.js)

### Behavioral Design Patterns
> ##### Behavioral Patterns are concerned with improving communication between dissimilar objects.
> ###### 

- #### [Chain of Responsibility](chain-of-responsibility.js)
- #### [Command](command.js)
- #### [Iterator](iterator.js)
- #### [Mediator](mediator.js)
- #### [Observer](observer.js)
- #### [State](state.js)
- #### [Strategy](strategy.js)
- #### [Template](template.js)